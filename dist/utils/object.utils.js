"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyValues = void 0;
const lodash_1 = require("lodash");
const removeEmptyValues = (data) => {
    return (0, lodash_1.omitBy)(data, (value) => (0, lodash_1.isUndefined)(value) || value === "");
};
exports.removeEmptyValues = removeEmptyValues;
