import { Request, Response } from "express";
import { readFileSync } from "fs";
import { z } from "zod";
import {
  targetOptions,
  bodyPartOptions,
  equipmentOptions,
} from "../types/exercises.types";
import { Schema } from "../utils/validation.utils";
import { numericString } from "../types/schema-helpers";

export const getAllExercisesSchema: Schema = {
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
};

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const { query, body } = req;

    const { offset = "0", limit = "10", search } = query;

    const exercises = readFileSync("src/assets/exercises.json", "utf8");

    const response = JSON.parse(exercises).slice(Number(offset), Number(limit));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
