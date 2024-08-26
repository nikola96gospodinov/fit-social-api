import type { ZodObject, ZodRawShape } from "zod";

export type StrictZodObject = ZodObject<ZodRawShape, "strict">;
