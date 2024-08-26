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
exports.getAllExercises = void 0;
const fs_1 = require("fs");
const zod_1 = require("zod");
const exercises_types_1 = require("../types/exercises.types");
const validation_utils_1 = require("../utils/validation.utils");
const schema_helpers_1 = require("../utils/schema-helpers");
const search_utils_1 = require("../utils/search.utils");
const getAllExercisesSchema = {
    querySchema: zod_1.z.strictObject({
        offset: schema_helpers_1.numericString.optional(),
        limit: schema_helpers_1.numericString.optional(),
        search: zod_1.z.string().optional(),
    }),
    bodySchema: zod_1.z.strictObject({
        targetFilters: zod_1.z
            .array(zod_1.z.enum(exercises_types_1.targetOptions), {
            message: "Invalid target filters",
        })
            .optional(),
        bodyPartFilters: zod_1.z
            .array(zod_1.z.enum(exercises_types_1.bodyPartOptions), {
            message: "Invalid body part filters",
        })
            .optional(),
        equipmentFilters: zod_1.z
            .array(zod_1.z.enum(exercises_types_1.equipmentOptions), {
            message: "Invalid equipment filters",
        })
            .optional(),
    }),
    paramsSchema: zod_1.z.strictObject({}),
};
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = (0, validation_utils_1.validateRoute)({
            schema: getAllExercisesSchema,
            req,
        });
        const { offset = "0", limit = "10", search } = query;
        const fileContent = (0, fs_1.readFileSync)("src/assets/exercises.json", "utf8");
        const exercises = JSON.parse(fileContent);
        let response = [];
        if (search) {
            response = (0, search_utils_1.searchByWordOccurrence)(exercises, search);
        }
        response = response.slice(Number(offset), Number(limit));
        res.status(200).json(response);
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
exports.getAllExercises = getAllExercises;
