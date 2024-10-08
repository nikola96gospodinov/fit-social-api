"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
const urls_utils_1 = require("../utils/urls.utils");
exports.URL = {
    EXERCISE: {
        base: "https://exercisedb.p.rapidapi.com/exercises",
        GET_EXERCISES(queryParams) {
            return (0, urls_utils_1.addQueryParamsToUrl)(this.base, queryParams);
        },
        GET_EXERCISE_BY_ID(id) {
            return `${this.base}/exercise/${id}`;
        },
        GET_EXERCISES_BY_BODY_PART(_a) {
            var { bodyPart } = _a, queryParams = __rest(_a, ["bodyPart"]);
            const url = `${this.base}/bodyPart/${bodyPart}`;
            return (0, urls_utils_1.addQueryParamsToUrl)(url, queryParams);
        },
        GET_EXERCISES_BY_EQUIPMENT_TYPE(_a) {
            var { equipmentType } = _a, queryParams = __rest(_a, ["equipmentType"]);
            const url = `${this.base}/equipment/${equipmentType}`;
            return (0, urls_utils_1.addQueryParamsToUrl)(url, queryParams);
        },
        GET_EXERCISES_BY_TARGET_MUSCLE(_a) {
            var { targetMuscle } = _a, queryParams = __rest(_a, ["targetMuscle"]);
            const url = `${this.base}/target/${targetMuscle}`;
            return (0, urls_utils_1.addQueryParamsToUrl)(url, queryParams);
        },
    },
};
