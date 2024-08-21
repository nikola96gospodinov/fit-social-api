import { Request, Response } from "express";
import { readFileSync } from "fs";

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = readFileSync("src/assets/exercises.json", "utf8");

    res.status(200).json(JSON.parse(exercises));
  } catch (error) {
    console.error(error);
  }
};
