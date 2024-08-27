import { Request, Response } from "express";
import { z } from "zod";
import { numericString } from "../utils/schema-helpers";
import { validateRoute } from "../utils/validation.utils";
import { readFileSync } from "fs";
import { Exercise } from "../types/exercises.types";

const getExerciseByIdSchema = {
  querySchema: z.strictObject({}),
  bodySchema: z.strictObject({
    ids: z.array(numericString),
  }),
  paramsSchema: z.strictObject({}),
};

export const getExercisesByIds = async (req: Request, res: Response) => {
  try {
    const {
      body: { ids },
    } = validateRoute({
      schema: getExerciseByIdSchema,
      req,
    });

    const fileContent = readFileSync("src/assets/exercises.json", "utf8");

    const exercises: Exercise[] = JSON.parse(fileContent);

    const filteredExercises = exercises.filter((exercise) =>
      ids.includes(exercise.id)
    );

    if (filteredExercises.length === 0) {
      return res.status(404).json({ message: "No exercises found" });
    }

    res.status(200).json(filteredExercises);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
