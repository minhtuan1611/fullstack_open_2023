import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculator, Operation } from "./calculator";
const app = express();

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

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // validate the data here

  // assert the type
  const operation = op as Operation;

  const result = calculator(Number(value1), Number(value2), operation);

  return res.send({ result });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
