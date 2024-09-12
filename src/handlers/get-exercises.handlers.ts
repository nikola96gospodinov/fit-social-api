import { Request, Response } from "express";
import { readFileSync } from "fs";
import { z } from "zod";
import {
  targetOptions,
  bodyPartOptions,
  equipmentOptions,
  Exercise,
} from "../types/exercises.types";
import { validateRoute } from "../utils/validation.utils";
import { numericString, stringToJSONSchema } from "../utils/schema-helpers";
import { searchByWordOccurrence } from "../utils/search.utils";
import { isEmpty } from "lodash";

const getAllExercisesSchema = {
  querySchema: z.strictObject({
    offset: numericString.optional(),
    limit: numericString.optional(),
    search: z.string().optional(),
    targetFilters: stringToJSONSchema
      .pipe(z.array(z.enum(targetOptions)))
      .optional(),
    bodyPartFilters: stringToJSONSchema
      .pipe(z.array(z.enum(bodyPartOptions)))
      .optional(),
    equipmentFilters: stringToJSONSchema
      .pipe(z.array(z.enum(equipmentOptions)))
      .optional(),
  }),
  bodySchema: z.strictObject({}),
  paramsSchema: z.strictObject({}),
};

export const getExercises = async (req: Request, res: Response) => {
  try {
    const { query } = validateRoute({
      schema: getAllExercisesSchema,
      req,
    });

    const fileContent = readFileSync("src/assets/exercises.json", "utf8");

    const exercises = JSON.parse(fileContent);

    let response = exercises;

    const {
      offset = "0",
      limit = "25",
      search,
      targetFilters,
      bodyPartFilters,
      equipmentFilters,
    } = query;

    if (
      !isEmpty(targetFilters) ||
      !isEmpty(bodyPartFilters) ||
      !isEmpty(equipmentFilters)
    ) {
      response = response.filter((exercise: Exercise) =>
        filterByCriteria(
          exercise,
          targetFilters,
          bodyPartFilters,
          equipmentFilters
        )
      );
    }

    if (search) {
      response = searchByWordOccurrence(response, search);
    }

    const total = response.length;
    const offsetNumber = Number(offset);
    const limitNumber = Number(limit);

    response = response.slice(offsetNumber, offsetNumber + limitNumber);

    res.status(200).json({
      offset: offsetNumber,
      limit: limitNumber,
      total,
      data: response,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const filterByCriteria = (
  exercise: Exercise,
  targetFilters?: string[],
  bodyPartFilters?: string[],
  equipmentFilters?: string[]
) => {
  const matchesTarget = targetFilters?.includes(exercise.target);
  const matchesBodyPart = bodyPartFilters?.includes(exercise.bodyPart);
  const matchesEquipment = equipmentFilters?.includes(exercise.equipment);

  if (isEmpty(targetFilters) && isEmpty(bodyPartFilters)) {
    return matchesEquipment;
  }

  return (
    (matchesTarget || matchesBodyPart) &&
    (isEmpty(equipmentFilters) || matchesEquipment)
  );
};
