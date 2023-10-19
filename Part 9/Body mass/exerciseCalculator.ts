interface Rate {
  value: number;
  description: string;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rate;
  target: number;
  average: number;
}

const Rating = [
  {
    value: 1,
    description: "bad",
  },
  {
    value: 2,
    description: "not bad but could be better",
  },
  {
    value: 3,
    description: "better than expected",
  },
];

const calculateExercises = (dailyH: number[], target: number): Result => {
  const periodLength = dailyH.length;
  const trainingDays = dailyH.filter((hours) => hours > 0).length;
  const average =
    dailyH.reduce((total, hours) => total + hours, 0) / periodLength;

  const finished = average / target;
  let rating;
  if (finished < 0.75) rating = Rating[0];
  else if (0.75 <= finished && finished < 1) rating = Rating[1];
  else rating = Rating[2];

  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    target,
    average,
  };
};

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
