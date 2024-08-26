"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoute = exports.parseWithSchema = void 0;
const zod_1 = require("zod");
const parseWithSchema = ({ data, schema, errorMessage, }) => {
    return schema.parse(data, {
        errorMap: (error, ctx) => {
            if (error.code === zod_1.ZodIssueCode.unrecognized_keys) {
                return { message: errorMessage };
            }
            return { message: ctx.defaultError };
        },
    });
};
exports.parseWithSchema = parseWithSchema;
const validateRoute = ({ schema, req, }) => {
    const { querySchema, bodySchema, paramsSchema } = schema;
    const query = (0, exports.parseWithSchema)({
        data: req.query,
        schema: querySchema,
        errorMessage: "Unrecognized query parameters",
    });
    const body = (0, exports.parseWithSchema)({
        data: req.body,
        schema: bodySchema,
        errorMessage: "Unrecognized body parameters",
    });
    const params = (0, exports.parseWithSchema)({
        data: req.params,
        schema: paramsSchema,
        errorMessage: "Unrecognized path parameters",
    });
    const headers = (0, exports.parseWithSchema)({
        data: req.headers,
        schema: schema.headerSchema,
        errorMessage: "Unrecognized headers",
    });
    return { query, body, params, headers };
};
exports.validateRoute = validateRoute;
