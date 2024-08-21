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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
const urls_constants_1 = require("../constants/urls.constants");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
exports.default = (0, node_schedule_1.scheduleJob)("0 */2 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = urls_constants_1.URL.EXERCISE.GET_EXERCISES({
            limit: 9999,
            offset: 0,
        });
        const response = yield fetch(url, {
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": process.env.RAPID_API_HOST,
            },
        });
        if (!response.ok) {
            console.error(yield response.text());
            console.error(yield response.json());
            throw new Error("An error occurred while fetching exercises");
        }
        const data = yield response.json();
        const basePath = path_1.default.join(__dirname, "..", "assets", "exercises.json");
        (0, fs_1.writeFile)(basePath, JSON.stringify(data), "utf8", (err) => {
            if (err) {
                console.error(err);
                throw new Error("An error occurred while writing exercises to file");
            }
            else {
                console.log("Exercises updated successfully");
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}));
