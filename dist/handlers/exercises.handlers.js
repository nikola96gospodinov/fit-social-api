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
const queryParamsSchema = zod_1.z
    .object({
    offset: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
})
    .strict();
const bodySchema = zod_1.z
    .object({
    targetFilters: zod_1.z.array(zod_1.z.enum(exercises_types_1.targetOptions)).optional(),
    bodyPartFilters: zod_1.z.array(zod_1.z.enum(exercises_types_1.bodyPartOptions)).optional(),
    equipmentFilters: zod_1.z.array(zod_1.z.enum(exercises_types_1.equipmentOptions)).optional(),
})
    .strict();
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, body } = req;
        const queryParams = queryParamsSchema.safeParse(query);
        if (!queryParams.success) {
            return res.status(400).json({ message: "Invalid query parameters" });
        }
        const validatedBody = bodySchema.safeParse(body);
        if (!validatedBody.success) {
            return res.status(400).json({ message: "Invalid body parameters" });
        }
        const { offset = "0", limit = "10", search } = queryParams.data;
        const exercises = (0, fs_1.readFileSync)("src/assets/exercises.json", "utf8");
        const response = JSON.parse(exercises).slice(Number(offset), Number(limit));
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllExercises = getAllExercises;
