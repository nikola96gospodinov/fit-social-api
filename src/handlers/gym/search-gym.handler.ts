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
            circle: {
              center: {
                latitude: Number(query.latitude),
                longitude: Number(query.longitude),
              },
            },
          }
        : {};

    // Construct request
    const request = {
      textQuery: query.textQuery,
      includedType: "gym",
      ...locationBias,
    };

    // Run request
    const response = await client.searchText(request, {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask":
            "places.displayName,places.id,places.formattedAddress",
        },
      },
    });

    const gyms = response[0].places
      ?.map((place) => ({
        id: place.id,
        name: place.displayName?.text,
        address: place.formattedAddress,
      }))
      .filter((place) => place.name && place.address);

    res.status(200).json(gyms);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return res.status(400).json(error.errors);
    }

    console.log(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
};
