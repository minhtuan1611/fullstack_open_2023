import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises, { Result } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res
      .status(400)
      .json({ error: "Please provide valid height and weight" });
  }

  const result = calculateBmi(Number(height), Number(weight));
  return res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: result,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    return res
      .status(400)
      .json({ error: "Please provide valid daily exercises and target" });
  }

  const result: Result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
