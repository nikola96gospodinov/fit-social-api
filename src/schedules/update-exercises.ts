import { scheduleJob } from "node-schedule";
import { URL } from "../constants/urls.constants";
import { writeFile } from "fs";
import { Exercise } from "../types/exercises.types";

export const updateExercises = async () => {
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

    const exercises = await response.json();

    const filteredExercises = exercises.filter(
      (exercise: Exercise) =>
        !exercise.name.includes("male") &&
        !exercise.name.includes("female") &&
        !exercise.name.includes("v.")
    );

    writeFile(
      "src/assets/exercises.json",
      JSON.stringify(filteredExercises),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          throw new Error("An error occurred while writing exercises to file");
        } else {
          console.log("Exercises updated successfully");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default scheduleJob("0 */2 * * *", async () => {
  await updateExercises();
});
