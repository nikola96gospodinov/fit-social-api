import { Request, Response } from "express";

export const getExercises = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send("An error occurred while trying to fetch exercises");
  }
};
