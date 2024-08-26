export const targetOptions = [
  "abs",
  "quads",
  "lats",
  "calves",
  "pectorals",
  "glutes",
  "hamstrings",
  "adductors",
  "triceps",
  "cardiovascular system",
  "spine",
  "upper back",
  "biceps",
  "delts",
  "forearms",
  "traps",
  "serratus anterior",
  "abductors",
  "levator scapulae",
] as const;

export type Target = (typeof targetOptions)[number];

export const bodyPartOptions = [
  "waist",
  "upper legs",
  "back",
  "lower legs",
  "chest",
  "upper arms",
  "cardio",
  "shoulders",
  "lower arms",
  "neck",
] as const;

export type BodyPart = (typeof bodyPartOptions)[number];

export const equipmentOptions = [
  "body weight",
  "cable",
  "leverage machine",
  "assisted",
  "medicine ball",
  "stability ball",
  "band",
  "barbell",
  "rope",
  "dumbbell",
  "ez barbell",
  "sled machine",
  "upper body ergometer",
  "kettlebell",
  "olympic barbell",
  "weighted",
  "bosu ball",
  "resistance band",
  "roller",
  "skierg machine",
  "hammer",
  "smith machine",
  "wheel roller",
  "stationary bike",
  "tire",
  "trap bar",
  "elliptical machine",
  "stepmill machine",
] as const;

export type Equipment = (typeof equipmentOptions)[number];

export type GetExercisesProps = {
  limit?: number;
  offset?: number;
};

export type Exercise = {
  bodyPart: BodyPart;
  equipment: Equipment;
  gifUrl: string;
  id: string;
  name: string;
  target: Target;
  secondaryMuscles: Array<Target | string>;
  instructions: string[];
};
