function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

const args = process.argv.slice(2);
const height = Number(args[0]);
const weight = Number(args[1]);

if (isNaN(height) || isNaN(weight)) {
  console.log(
    "Please provide valid height and weight as command-line arguments."
  );
} else {
  const result = calculateBmi(height, weight);
  console.log(result);
}

export default calculateBmi;