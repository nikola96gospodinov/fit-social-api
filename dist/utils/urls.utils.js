"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQueryParamsToUrl = void 0;
const lodash_1 = require("lodash");
const object_utils_1 = require("./object.utils");
const addQueryParamsToUrl = (url, queryParams) => {
    if (!queryParams)
        return url;
    const queryParamsWithoutEmptyValues = (0, object_utils_1.removeEmptyValues)(queryParams);
    if ((0, lodash_1.isEmpty)(queryParamsWithoutEmptyValues))
        return url;
    const urlSearchParams = new URLSearchParams(queryParamsWithoutEmptyValues);
    return `${url}?${urlSearchParams.toString()}`;
};
exports.addQueryParamsToUrl = addQueryParamsToUrl;
