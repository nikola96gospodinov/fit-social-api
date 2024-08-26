import { z } from "zod";

export const numericString = z.string().regex(/^\d+$/, {
  message: "You need to enter a numeric value",
});
