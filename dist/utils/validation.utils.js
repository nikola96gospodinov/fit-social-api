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
exports.validateWithZod = void 0;
const zod_1 = require("zod");
const parseWithSchema = ({ data, schema, errorMessage, }) => {
    if (schema) {
        schema.parse(data, {
            errorMap: (error, ctx) => {
                if (error.code === zod_1.ZodIssueCode.unrecognized_keys && errorMessage) {
                    return { message: errorMessage };
                }
                return { message: ctx.defaultError };
            },
        });
    }
};
const validateWithZod = ({ querySchema, bodySchema, paramsSchema }) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        parseWithSchema({
            data: req.query,
            schema: querySchema,
            errorMessage: "Unrecognized query parameters",
        });
        parseWithSchema({
            data: req.body,
            schema: bodySchema,
            errorMessage: "Unrecognized body parameters",
        });
        parseWithSchema({
            data: req.params,
            schema: paramsSchema,
            errorMessage: "Unrecognized path parameters",
        });
        return next();
    }
    catch (err) {
        const error = err instanceof zod_1.ZodError ? err.errors : err;
        console.error(error);
        return res.status(400).json(error);
    }
});
exports.validateWithZod = validateWithZod;
