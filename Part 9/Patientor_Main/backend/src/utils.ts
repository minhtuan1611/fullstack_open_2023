import { NewPatientEntry, Gender } from "./types";
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
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

const toNewPatientEntry = (fields: Fields): NewPatientEntry => {
  const { name, dateOfBirth, ssn, gender, occupation } = fields;
  return {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
  };
};

export default toNewPatientEntry;
