import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NonsensitivePatientEntry, NewPatientEntry, Patient } from "../types";

const patients: Patient[] = patientsData;
const getPatients = (): NonsensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
};
