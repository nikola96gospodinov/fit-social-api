import { Request, Response } from "express";
import { z } from "zod";
import { numericString } from "../../utils/schema-helpers";
import { validateRoute } from "../../utils/validation.utils";
import { readFileSync } from "fs";
import { Exercise } from "../../types/exercises.types";

const getExerciseByIdSchema = {
  querySchema: z.strictObject({}),
  bodySchema: z.strictObject({}),
  paramsSchema: z.strictObject({
    id: numericString,
  }),
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { params } = validateRoute({
      schema: getExerciseByIdSchema,
      req,
    });

    const fileContent = readFileSync("src/assets/exercises.json", "utf8");

    const exercises: Exercise[] = JSON.parse(fileContent);

    const exercise = exercises.find((exercise) => exercise.id === params.id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
