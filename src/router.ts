import { Router } from "express";
import { getExercises } from "./handlers/get-exercises.handlers";
import { getExerciseById } from "./handlers/get-exercise-by-id.handler";
import { getExercisesByIds } from "./handlers/get-exercises-by-ids.handler";

const router = Router();

router.route("/exercises").post(getExercises); // We're using post because we're sending a body with the request

router.route("/exercises/:id").get(getExerciseById);

router.route("/exercises-by-ids").post(getExercisesByIds); // We're using post because we're sending a body with the request

export default router;
