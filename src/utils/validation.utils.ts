import { Request } from "express";
import { ZodIssueCode, z } from "zod";
import { StrictZodObject } from "../types/helpers.types";

type parseWithSchemaType<Schema extends StrictZodObject> = {
  data: unknown;
  schema: Schema;
  errorMessage: string;
};

export const parseWithSchema = <Schema extends StrictZodObject>({
  data,
  schema,
  errorMessage,
}: parseWithSchemaType<Schema>) => {
  return schema.parse(data, {
    errorMap: (error, ctx) => {
      if (error.code === ZodIssueCode.unrecognized_keys) {
        return { message: errorMessage };
      }
      return { message: ctx.defaultError };
    },
  }) as z.infer<Schema>;
};

export type Schema<
  Query extends StrictZodObject,
  Body extends StrictZodObject,
  Params extends StrictZodObject,
  Headers extends StrictZodObject
> = {
  querySchema: Query;
  bodySchema: Body;
  paramsSchema: Params;
  headerSchema: Headers;
};

type Props<
  Query extends StrictZodObject,
  Body extends StrictZodObject,
  Params extends StrictZodObject,
  Headers extends StrictZodObject
> = {
  schema: Schema<Query, Body, Params, Headers>;
  req: Request;
};

export const validateRoute = <
  Query extends StrictZodObject,
  Body extends StrictZodObject,
  Params extends StrictZodObject,
  Headers extends StrictZodObject
>({
  schema,
  req,
}: Props<Query, Body, Params, Headers>) => {
  const { querySchema, bodySchema, paramsSchema } = schema;

  const query = parseWithSchema({
    data: req.query,
    schema: querySchema,
    errorMessage: "Unrecognized query parameters",
  });

  const body = parseWithSchema({
    data: req.body,
    schema: bodySchema,
    errorMessage: "Unrecognized body parameters",
  });

  const params = parseWithSchema({
    data: req.params,
    schema: paramsSchema,
    errorMessage: "Unrecognized path parameters",
  });

  const headers = parseWithSchema({
    data: req.headers,
    schema: schema.headerSchema,
    errorMessage: "Unrecognized headers",
  });

  return { query, body, params, headers };
};
