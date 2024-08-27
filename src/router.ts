import { Router } from "express";
import { getExercises } from "./handlers/get-exercises.handlers";
import { getExerciseById } from "./handlers/get-exercise-by-id.handler";
import { getExercisesByIds } from "./handlers/get-exercises-by-ids.handler";

const router = Router();

router.route("/exercises").get(getExercises);

router.route("/exercises/:id").get(getExerciseById);

router.route("/exercises-by-ids").get(getExercisesByIds);

export default router;
