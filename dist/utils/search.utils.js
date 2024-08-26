"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByWordOccurrence = void 0;
const searchByWordOccurrence = (exercises, search) => {
    const words = search.toLowerCase().split(" ");
    const rankedExercises = exercises
        .map((exercise) => {
        const exerciseWords = exercise.name.toLowerCase().split(" ");
        const matchingWordsCount = words.filter((word) => exerciseWords.includes(word)).length;
        return { exercise, matchingWordsCount };
    })
        .filter(({ matchingWordsCount }) => matchingWordsCount > 0);
    rankedExercises.sort((a, b) => b.matchingWordsCount - a.matchingWordsCount);
    const filteredExercises = rankedExercises.map(({ exercise }) => exercise);
    return filteredExercises;
};
exports.searchByWordOccurrence = searchByWordOccurrence;
