import { Patient, Gender, Entry, NewPatientEntry } from "./types";

type Fields = {
  id?: unknown;
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
  entries: unknown;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEntries = (array: unknown): array is Entry[] => {
  return Array.isArray(array);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date:" + date);
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error("Incorrect or missing gender");
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation");
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !ssn.includes("-"))
    throw new Error("Incorrect or missing ssn");
  return ssn;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntries(entries))
    throw new Error("Incorrect or missing entries" + entries);
  return entries;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id) || !(id.length > 10))
    throw new Error("Incorrect or missing id" + id);
  return id;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    entries: parseEntries(entries),
  };
  return newEntry;
};

export const loadPatientsJSON = (patientsJSON: Fields[]): Patient[] => {
  const patients = patientsJSON.map((patient) => {
    const { id, name, dateOfBirth, gender, occupation, ssn, entries } = patient;
    return {
      id: parseId(id),
      name: parseName(name),
      dateOfBirth: parseDate(dateOfBirth),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      ssn: parseSsn(ssn),
      entries: parseEntries(entries),
    };
  });
  return patients;
};

export default toNewPatientEntry;
