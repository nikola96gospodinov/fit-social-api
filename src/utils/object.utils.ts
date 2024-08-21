import { omitBy, isUndefined } from "lodash";

export const removeEmptyValues = (
  data: Record<string, unknown>
): Record<string, unknown> | undefined => {
  return omitBy(data, (value) => isUndefined(value) || value === "");
};
