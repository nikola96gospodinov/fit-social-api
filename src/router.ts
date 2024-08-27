import { Router } from "express";
import { getExercises } from "./handlers/get-exercises.handlers";
import { getExerciseById } from "./handlers/get-exercise-by-id.handler";

const router = Router();

router.route("/exercises").get(getExercises);

router.route("/exercise/:id").get(getExerciseById);

export default router;
