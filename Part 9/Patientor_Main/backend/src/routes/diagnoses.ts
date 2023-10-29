import express, { Response } from "express";
import diagnoseService from "../services/diagnoseService";
const router = express.Router();

router.get("/", (_req, res: Response) => {
  return res.send(diagnoseService.getDiagnoses());
});

router.post("/", (_req, res: Response) => {
  return res.send("Saving a diagnose");
});

export default router;
