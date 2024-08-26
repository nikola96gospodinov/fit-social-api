import { Router } from "express";
import { getAllExercises } from "./handlers/exercises.handlers";

const router = Router();

router.route("/exercises").get(getAllExercises);

export default router;
