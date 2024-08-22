import { Request, Response } from "express";
import { readFileSync } from "fs";
import { z } from "zod";
import {
  targetOptions,
  bodyPartOptions,
  equipmentOptions,
} from "../types/exercises.types";

const queryParamsSchema = z
  .object({
    offset: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  })
  .strict();

const bodySchema = z
  .object({
    targetFilters: z.array(z.enum(targetOptions)).optional(),
    bodyPartFilters: z.array(z.enum(bodyPartOptions)).optional(),
    equipmentFilters: z.array(z.enum(equipmentOptions)).optional(),
  })
  .strict();

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const { query, body } = req;

    const queryParams = queryParamsSchema.safeParse(query);

    if (!queryParams.success) {
      return res.status(400).json({ message: "Invalid query parameters" });
    }

    const validatedBody = bodySchema.safeParse(body);

    if (!validatedBody.success) {
      return res.status(400).json({ message: "Invalid body parameters" });
    }

    const { offset = "0", limit = "10", search } = queryParams.data;

    const exercises = readFileSync("src/assets/exercises.json", "utf8");

    const response = JSON.parse(exercises).slice(Number(offset), Number(limit));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
