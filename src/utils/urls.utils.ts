import { isEmpty } from "lodash";
import { removeEmptyValues, turnAllObjectValuesToString } from "./object.utils";

export const addQueryParamsToUrl = (
  url: string,
  queryParams?: Record<string, unknown>
) => {
  if (!queryParams) return url;

  const queryParamsWithoutEmptyValues = removeEmptyValues(queryParams);

  if (isEmpty(queryParamsWithoutEmptyValues)) return url;

  const sanitizedQueryParams = turnAllObjectValuesToString(
    queryParamsWithoutEmptyValues
  );

  const urlSearchParams = new URLSearchParams(sanitizedQueryParams);
  return `${url}?${urlSearchParams.toString()}`;
};
