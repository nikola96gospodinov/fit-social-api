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
exports.getExercises = void 0;
const fs_1 = require("fs");
const zod_1 = require("zod");
const exercises_types_1 = require("../types/exercises.types");
const validation_utils_1 = require("../utils/validation.utils");
const schema_helpers_1 = require("../utils/schema-helpers");
const search_utils_1 = require("../utils/search.utils");
const lodash_1 = require("lodash");
const getAllExercisesSchema = {
    querySchema: zod_1.z.strictObject({
        offset: schema_helpers_1.numericString.optional(),
        limit: schema_helpers_1.numericString.optional(),
        search: zod_1.z.string().optional(),
        targetFilters: schema_helpers_1.stringToJSONSchema
            .pipe(zod_1.z.array(zod_1.z.enum(exercises_types_1.targetOptions)))
            .optional(),
        bodyPartFilters: schema_helpers_1.stringToJSONSchema
            .pipe(zod_1.z.array(zod_1.z.enum(exercises_types_1.bodyPartOptions)))
            .optional(),
        equipmentFilters: schema_helpers_1.stringToJSONSchema
            .pipe(zod_1.z.array(zod_1.z.enum(exercises_types_1.equipmentOptions)))
            .optional(),
    }),
    bodySchema: zod_1.z.strictObject({}),
    paramsSchema: zod_1.z.strictObject({}),
};
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = (0, validation_utils_1.validateRoute)({
            schema: getAllExercisesSchema,
            req,
        });
        const fileContent = (0, fs_1.readFileSync)("src/assets/exercises.json", "utf8");
        const exercises = JSON.parse(fileContent);
        let response = exercises;
        const { offset = "0", limit = "25", search, targetFilters, bodyPartFilters, equipmentFilters, } = query;
        response = response.filter((exercise) => {
            return ((!(0, lodash_1.isEmpty)(targetFilters) && (targetFilters === null || targetFilters === void 0 ? void 0 : targetFilters.includes(exercise.target))) ||
                (!(0, lodash_1.isEmpty)(bodyPartFilters) &&
                    (bodyPartFilters === null || bodyPartFilters === void 0 ? void 0 : bodyPartFilters.includes(exercise.bodyPart))) ||
                (!(0, lodash_1.isEmpty)(equipmentFilters) &&
                    (equipmentFilters === null || equipmentFilters === void 0 ? void 0 : equipmentFilters.includes(exercise.equipment))));
        });
        if (search) {
            response = (0, search_utils_1.searchByWordOccurrence)(response, search);
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
exports.getExercises = getExercises;
