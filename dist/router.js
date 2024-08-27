"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_exercises_handlers_1 = require("./handlers/get-exercises.handlers");
const get_exercise_by_id_handler_1 = require("./handlers/get-exercise-by-id.handler");
const get_exercises_by_ids_handler_1 = require("./handlers/get-exercises-by-ids.handler");
const router = (0, express_1.Router)();
router.route("/exercises").post(get_exercises_handlers_1.getExercises); // We're using post because we're sending a body with the request
router.route("/exercises/:id").get(get_exercise_by_id_handler_1.getExerciseById);
router.route("/exercises-by-ids").post(get_exercises_by_ids_handler_1.getExercisesByIds); // We're using post because we're sending a body with the request
exports.default = router;
