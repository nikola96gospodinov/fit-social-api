"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToJSONSchema = exports.numericString = void 0;
const zod_1 = require("zod");
exports.numericString = zod_1.z.string().regex(/^\d+$/, {
    message: "You need to enter a numeric value",
});
exports.stringToJSONSchema = zod_1.z
    .string()
    .transform((str, ctx) => {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" });
        return zod_1.z.NEVER;
    }
});
