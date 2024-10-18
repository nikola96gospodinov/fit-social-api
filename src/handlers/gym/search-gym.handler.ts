import { PlacesClient } from "@googlemaps/places";
import { Request, Response } from "express";
import { z } from "zod";
import { numericString } from "../../utils/schema-helpers";
import { validateRoute } from "../../utils/validation.utils";

const client = new PlacesClient({
  // TODO: Restrict key
  apiKey: process.env.GOOGLE_API_KEY,
  libVersion: "v1",
});

const searchGymsSchema = {
  querySchema: z.strictObject({
    textQuery: z.string(),
    offset: numericString.optional(),
    limit: numericString.optional(),
    latitude: numericString.optional(),
    longitude: numericString.optional(),
  }),
  bodySchema: z.strictObject({}),
  paramsSchema: z.strictObject({}),
};

export const searchGyms = async (req: Request, res: Response) => {
  try {
    const { query } = validateRoute({
      schema: searchGymsSchema,
      req: req,
    });

    const locationBias =
      query.latitude && query.longitude
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

    const response = await client.autocompletePlaces({
      input: query.textQuery,
      includedPrimaryTypes: ["gym"],
      ...locationBias,
    });

    const gyms = response[0].suggestions?.map((suggestion) => ({
      id: suggestion.placePrediction?.placeId,
      primaryName: suggestion.placePrediction?.structuredFormat?.mainText?.text,
      secondaryName:
        suggestion.placePrediction?.structuredFormat?.secondaryText?.text,
    }));

    res.status(200).json(gyms);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
