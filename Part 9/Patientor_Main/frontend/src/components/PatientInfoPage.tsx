import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { Patient, Entry, Diagnosis } from "./../types";
import { apiBaseUrl } from "../constants";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data: ", error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(response.data);
      } catch (error) {
        console.error("Error fetching diagnoses: ", error);
      }
    };

    fetchPatientData();
    fetchDiagnoses();
  }, [id]);

  const getDescriptionForCode = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "Description not found";
  };

  return patient ? (
    <div className="patient-details">
      <Typography variant="h6">
        <strong>{patient.name}</strong>
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <div>
        <Typography variant="subtitle1">Ssh: {patient.ssn}</Typography>
        <Typography variant="subtitle1">
          Occupation: {patient.occupation}
        </Typography>
      </div>

      <Typography variant="h6">Entries:</Typography>
      <List>
        {patient.entries.map((entry: Entry, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${entry.date} - ${entry.description}`}
              secondary={
                entry.diagnosisCodes ? (
                  <div>
                    <Typography variant="body2">Diagnosis Codes:</Typography>
                    <ul>
                      {entry.diagnosisCodes.map((code: string, i: number) => (
                        <li key={i}>
                          {code} {getDescriptionForCode(code)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  ) : (
    <h3> Patient not found</h3>
  );
};

export default PatientDetailsPage;
