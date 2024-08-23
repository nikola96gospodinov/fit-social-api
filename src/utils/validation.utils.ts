import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodIssueCode, ZodError } from "zod";

type parseWithSchemaType = {
  data: unknown;
  schema?: ZodObject<ZodRawShape, "strict">;
  errorMessage?: string;
};

const parseWithSchema = ({
  data,
  schema,
  errorMessage,
}: parseWithSchemaType) => {
  if (schema) {
    schema.parse(data, {
      errorMap: (error, ctx) => {
        if (error.code === ZodIssueCode.unrecognized_keys && errorMessage) {
          return { message: errorMessage };
        }
        return { message: ctx.defaultError };
      },
    });
  }
};

export type Schema = {
  querySchema?: ZodObject<ZodRawShape, "strict">;
  bodySchema?: ZodObject<ZodRawShape, "strict">;
  paramsSchema?: ZodObject<ZodRawShape, "strict">;
};

export const validateWithZod =
  ({ querySchema, bodySchema, paramsSchema }: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (err) {
      const error = err instanceof ZodError ? err.errors : err;

      console.error(error);
      return res.status(400).json(error);
    }
  };
