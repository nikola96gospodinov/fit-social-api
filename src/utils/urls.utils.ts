import { isEmpty } from "lodash";
import { removeEmptyValues } from "./object.utils";

export const addQueryParamsToUrl = (
  url: string,
  queryParams?: Record<string, unknown>
) => {
  if (!queryParams) return url;

  const queryParamsWithoutEmptyValues = removeEmptyValues(
    queryParams
  ) as Record<string, string>;

  if (isEmpty(queryParamsWithoutEmptyValues)) return url;

  const urlSearchParams = new URLSearchParams(queryParamsWithoutEmptyValues);
  return `${url}?${urlSearchParams.toString()}`;
};
