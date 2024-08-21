import { scheduleJob } from "node-schedule";
import { URL } from "../constants/urls.constants";
import { writeFile } from "fs";
import path from "path";

export default scheduleJob("0 */2 * * *", async () => {
  try {
    const url = URL.EXERCISE.GET_EXERCISES({
      limit: 9999,
      offset: 0,
    });

    const response = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY as string,
        "x-rapidapi-host": process.env.RAPID_API_HOST as string,
      },
    });

    if (!response.ok) {
      console.error(await response.text());
      console.error(await response.json());
      throw new Error("An error occurred while fetching exercises");
    }

    const data = await response.json();

    const basePath = path.join(__dirname, "..", "assets", "exercises.json");
    writeFile(basePath, JSON.stringify(data), "utf8", (err) => {
      if (err) {
        console.error(err);
        throw new Error("An error occurred while writing exercises to file");
      } else {
        console.log("Exercises updated successfully");
      }
    });
  } catch (error) {
    console.error(error);
  }
});
