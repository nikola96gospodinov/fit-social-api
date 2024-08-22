"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercises_handlers_1 = require("./handlers/exercises.handlers");
const router = (0, express_1.Router)();
router.route("/exercises").get(exercises_handlers_1.getAllExercises);
exports.default = router;
