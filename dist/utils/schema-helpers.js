"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericString = void 0;
const zod_1 = require("zod");
exports.numericString = zod_1.z.string().regex(/^\d+$/, {
    message: "You need to enter a numeric value",
});
