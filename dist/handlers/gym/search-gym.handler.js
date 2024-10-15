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
const searchGyms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new places_1.PlacesClient({
            apiKey: process.env.GOOGLE_API_KEY,
            libVersion: "v1",
        });
        // Construct request
        const request = {
            textQuery: "Tacos in Mountain View",
        };
        // Run request
        const response = yield client.searchText(request, {
            otherArgs: {
                headers: {
                    "X-Goog-FieldMask": "places.displayName",
                },
            },
        });
        res.status(200).json({ response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.searchGyms = searchGyms;
