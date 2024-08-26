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

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const { query } = validateRoute({
      schema: getAllExercisesSchema,
      req,
    });

    const { offset = "0", limit = "10", search } = query;

    const fileContent = readFileSync("src/assets/exercises.json", "utf8");

    const exercises = JSON.parse(fileContent);

    let response: Exercise[] = [];

    if (search) {
      response = searchByWordOccurrence(exercises, search);
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
