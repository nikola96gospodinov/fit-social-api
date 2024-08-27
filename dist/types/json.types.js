"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const zod_1 = require("zod");
const literalSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]);
const jsonSchema = zod_1.z.lazy(() => zod_1.z.union([literalSchema, zod_1.z.array(jsonSchema), zod_1.z.record(jsonSchema)]));
const json = () => jsonSchema;
exports.json = json;
