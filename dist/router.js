"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercises_handlers_1 = require("./handlers/exercises.handlers");
const validation_utils_1 = require("./utils/validation.utils");
const router = (0, express_1.Router)();
router
    .route("/exercises")
    .get((0, validation_utils_1.validateWithZod)(exercises_handlers_1.getAllExercisesSchema), exercises_handlers_1.getAllExercises);
exports.default = router;
