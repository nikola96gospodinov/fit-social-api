import { Router } from "express";
import { getExercises } from "./handlers/exercise/get-exercises.handlers";
import { getExerciseById } from "./handlers/exercise/get-exercise-by-id.handler";
import { getExercisesByIds } from "./handlers/exercise/get-exercises-by-ids.handler";
import { searchGyms } from "./handlers/gym/search-gym.handler";

const router = Router();

router.route("/exercises").get(getExercises);

router.route("/exercises/:id").get(getExerciseById);

router.route("/exercises-by-ids").get(getExercisesByIds);

router.route("/search-gyms").get(searchGyms);

export default router;
