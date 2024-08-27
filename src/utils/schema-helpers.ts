import { z } from "zod";
import { json } from "../types/json.types";

export const numericString = z.string().regex(/^\d+$/, {
  message: "You need to enter a numeric value",
});

export const stringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });
