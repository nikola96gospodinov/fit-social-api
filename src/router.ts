import { Router } from "express";
import {
  getAllExercises,
  getAllExercisesSchema,
} from "./handlers/exercises.handlers";
import { validateWithZod } from "./utils/validation.utils";

const router = Router();

router
  .route("/exercises")
  .get(validateWithZod(getAllExercisesSchema), getAllExercises);

export default router;
