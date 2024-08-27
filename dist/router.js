"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_exercises_handlers_1 = require("./handlers/get-exercises.handlers");
const get_exercise_by_id_handler_1 = require("./handlers/get-exercise-by-id.handler");
const router = (0, express_1.Router)();
router.route("/exercises").get(get_exercises_handlers_1.getExercises);
router.route("/exercise/:id").get(get_exercise_by_id_handler_1.getExerciseById);
exports.default = router;
