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
import { numericString } from "../utils/schema-helpers";
import { searchByWordOccurrence } from "../utils/search.utils";

const getAllExercisesSchema = {
  querySchema: z.strictObject({
    offset: numericString.optional(),
    limit: numericString.optional(),
    search: z.string().optional(),
  }),
  bodySchema: z.strictObject({
    targetFilters: z
      .array(z.enum(targetOptions), {
        message: "Invalid target filters",
      })
      .optional(),
    bodyPartFilters: z
      .array(z.enum(bodyPartOptions), {
        message: "Invalid body part filters",
      })
      .optional(),
    equipmentFilters: z
      .array(z.enum(equipmentOptions), {
        message: "Invalid equipment filters",
      })
      .optional(),
  }),
  paramsSchema: z.strictObject({}),
};

export const getExercises = async (req: Request, res: Response) => {
  try {
    const { query, body } = validateRoute({
      schema: getAllExercisesSchema,
      req,
    });

    const fileContent = readFileSync("src/assets/exercises.json", "utf8");

    const exercises = JSON.parse(fileContent);

    let response = exercises;

    const { targetFilters, bodyPartFilters, equipmentFilters } = body;
    const { offset = "0", limit = "25", search } = query;

    if (targetFilters) {
      response = response.filter((exercise: Exercise) =>
        targetFilters.includes(exercise.target)
      );
    }

    if (bodyPartFilters) {
      response = response.filter((exercise: Exercise) =>
        bodyPartFilters.includes(exercise.bodyPart)
      );
    }

    if (equipmentFilters) {
      response = response.filter((exercise: Exercise) =>
        equipmentFilters.includes(exercise.equipment)
      );
    }

    if (search) {
      response = searchByWordOccurrence(response, search);
    }

    response = response.slice(Number(offset), Number(limit));

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
