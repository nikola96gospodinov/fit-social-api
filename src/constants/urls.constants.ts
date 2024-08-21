import { BodyPart, Equipment, Target } from "./../types/exercises.types";
import { GetExercisesProps } from "../types/exercises.types";
import { addQueryParamsToUrl } from "../utils/urls.utils";

export const URL = {
  EXERCISE: {
    base: "https://exercisedb.p.rapidapi.com/exercises/exercise",

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    GET_EXERCISE_BY_ID(id: string): string {
      return `${this.base}/exercise/${id}`;
    },

    GET_EXERCISES_BY_BODY_PART({
      bodyPart,
      ...queryParams
    }: GetExercisesProps & { bodyPart: BodyPart }): string {
      const url = `${this.base}/bodyPart/${bodyPart}`;
      return addQueryParamsToUrl(url, queryParams);
    },

    GET_EXERCISES_BY_EQUIPMENT_TYPE({
      equipmentType,
      ...queryParams
    }: GetExercisesProps & { equipmentType: Equipment }): string {
      const url = `${this.base}/equipment/${equipmentType}`;
      return addQueryParamsToUrl(url, queryParams);
    },

    GET_EXERCISES_BY_TARGET_MUSCLE({
      targetMuscle,
      ...queryParams
    }: GetExercisesProps & { targetMuscle: Target }): string {
      const url = `${this.base}/target/${targetMuscle}`;
      return addQueryParamsToUrl(url, queryParams);
    },
  },
};
