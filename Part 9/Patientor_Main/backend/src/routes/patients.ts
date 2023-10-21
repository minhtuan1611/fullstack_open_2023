import express, { Response } from "express";
import patientsServices from "../services/patientsService";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response) => {
  return res.send(patientsServices.getPatients());
});

router.get("/:id", (_req, res: Response) => {
  const id = _req.params.id;
  const foundPatient = patientsServices.getPatientsById(id);
  if (foundPatient) {
    return res.send(foundPatient).end();
  } else {
    return res.status(404).send("Patient not found").end();
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsServices.addPatient(newPatientEntry);
    return res.json(addedPatient).end();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(500).send("An unexpected error occurred.");
    }
  }
});

export default router;
