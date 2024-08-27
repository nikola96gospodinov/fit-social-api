"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExercisesByIds = void 0;
const zod_1 = require("zod");
const schema_helpers_1 = require("../utils/schema-helpers");
const validation_utils_1 = require("../utils/validation.utils");
const fs_1 = require("fs");
const getExerciseByIdSchema = {
    querySchema: zod_1.z.strictObject({}),
    bodySchema: zod_1.z.strictObject({
        ids: zod_1.z.array(schema_helpers_1.numericString),
    }),
    paramsSchema: zod_1.z.strictObject({}),
};
const getExercisesByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { ids }, } = (0, validation_utils_1.validateRoute)({
            schema: getExerciseByIdSchema,
            req,
        });
        const fileContent = (0, fs_1.readFileSync)("src/assets/exercises.json", "utf8");
        const exercises = JSON.parse(fileContent);
        const filteredExercises = exercises.filter((exercise) => ids.includes(exercise.id));
        if (filteredExercises.length === 0) {
            return res.status(404).json({ message: "No exercises found" });
        }
        res.status(200).json(filteredExercises);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.error(error.errors);
            return res.status(400).json(error.errors);
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getExercisesByIds = getExercisesByIds;
