import express, { Response, Request } from "express";
import diagnoseService from "../services/diagnoseService";
import patientsServices from "../services/patientsService";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response) => {
  return res.send(diagnoseService.getDiagnoses());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const foundPatient = patientsServices.getPatientsById(id);
  if (foundPatient) return res.json(foundPatient).end();
  return res.status(404).send("Patient not found");
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsServices.addPatient(newPatientEntry);
    return res.json(addedPatient).end();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(500).send("An unexpected error occurred");
    }
  }
});

export default router;
