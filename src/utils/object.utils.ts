import { omitBy, isUndefined, cloneDeepWith } from "lodash";

export const turnAllObjectValuesToString = (
  obj: Record<string, unknown>
): Record<string, string> => {
  return cloneDeepWith(obj, (value) => String(value));
};

export const removeEmptyValues = (
  data: Record<string, unknown>
): Record<string, unknown> | undefined => {
  return omitBy(data, (value) => isUndefined(value) || value === "");
};
