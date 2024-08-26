import { Exercise } from "../types/exercises.types";

export const searchByWordOccurrence = (
  exercises: Exercise[],
  search: string
) => {
  const words = search.toLowerCase().split(" ");

  const rankedExercises = exercises
    .map((exercise) => {
      const exerciseWords = exercise.name.toLowerCase().split(" ");
      const matchingWordsCount = words.filter((word) =>
        exerciseWords.includes(word)
      ).length;
      return { exercise, matchingWordsCount };
    })
    .filter(({ matchingWordsCount }) => matchingWordsCount > 0);

  rankedExercises.sort((a, b) => b.matchingWordsCount - a.matchingWordsCount);

  const filteredExercises = rankedExercises.map(({ exercise }) => exercise);

  return filteredExercises;
};
