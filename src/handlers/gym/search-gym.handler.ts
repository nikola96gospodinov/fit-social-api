import { PlacesClient } from "@googlemaps/places";
import { Request, Response } from "express";

export const searchGyms = async (_req: Request, res: Response) => {
  try {
    const client = new PlacesClient({
      apiKey: process.env.GOOGLE_API_KEY,
      libVersion: "v1",
    });

    // Construct request
    const request = {
      textQuery: "Tacos in Mountain View",
    };

    // Run request
    const response = await client.searchText(request, {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask": "places.displayName",
        },
      },
    });

    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
