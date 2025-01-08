"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGyms = void 0;
const places_1 = require("@googlemaps/places");
const zod_1 = require("zod");
const schema_helpers_1 = require("../../utils/schema-helpers");
const validation_utils_1 = require("../../utils/validation.utils");
const client = new places_1.PlacesClient({
    // TODO: Restrict key
    apiKey: process.env.GOOGLE_API_KEY,
    libVersion: "v1",
});
const searchGymsSchema = {
    querySchema: zod_1.z.strictObject({
        textQuery: zod_1.z.string(),
        offset: schema_helpers_1.numericString.optional(),
        limit: schema_helpers_1.numericString.optional(),
        latitude: schema_helpers_1.numericString.optional(),
        longitude: schema_helpers_1.numericString.optional(),
    }),
    bodySchema: zod_1.z.strictObject({}),
    paramsSchema: zod_1.z.strictObject({}),
};
const searchGyms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { query } = (0, validation_utils_1.validateRoute)({
            schema: searchGymsSchema,
            req: req,
        });
        const locationBias = query.latitude && query.longitude
            ? {
                locationBias: {
                    circle: {
                        center: {
                            latitude: Number(query.latitude),
                            longitude: Number(query.longitude),
                        },
                    },
                },
            }
            : {};
        const response = yield client.autocompletePlaces(Object.assign({ input: query.textQuery, includedPrimaryTypes: ["gym"] }, locationBias));
        const gyms = (_a = response[0].suggestions) === null || _a === void 0 ? void 0 : _a.map((suggestion) => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
                id: (_a = suggestion.placePrediction) === null || _a === void 0 ? void 0 : _a.placeId,
                primaryName: (_d = (_c = (_b = suggestion.placePrediction) === null || _b === void 0 ? void 0 : _b.structuredFormat) === null || _c === void 0 ? void 0 : _c.mainText) === null || _d === void 0 ? void 0 : _d.text,
                secondaryName: (_g = (_f = (_e = suggestion.placePrediction) === null || _e === void 0 ? void 0 : _e.structuredFormat) === null || _f === void 0 ? void 0 : _f.secondaryText) === null || _g === void 0 ? void 0 : _g.text,
            });
        });
        res.status(200).json(gyms);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.error(error.errors);
            return res.status(400).json(error.errors);
        }
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.searchGyms = searchGyms;
