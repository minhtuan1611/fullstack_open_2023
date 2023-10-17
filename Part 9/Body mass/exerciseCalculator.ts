interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  dailyHours: number[],
  target: number
): ExerciseResult {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const average =
    dailyHours.reduce((total, hours) => total + hours, 0) / periodLength;

  const success = average >= target;
  let rating = 1;
  let ratingDescription = "bad";

  if (success) {
    rating = 3;
    ratingDescription = "good";
  } else if (average - target >= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const args = process.argv.slice(2);
const target = Number(args[0]);
const dailyHours = args.slice(1).map(Number);

if (isNaN(target) || dailyHours.some(isNaN)) {
  console.log(
    "Please provide valid target and daily hours as command-line arguments."
  );
} else {
  const result = calculateExercises(dailyHours, target);
  console.log(result);
}

export default calculateExercises;
