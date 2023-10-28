import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import { Patient } from "./../types";
import { apiBaseUrl } from "../constants";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data: ", error);
      }
    };
    fetchPatientData();
  }, [id]);

  if (!patient) {
    return (
      <Typography variant="h6" align="center">
        Patient not found
      </Typography>
    );
  }
  return (
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
    </div>
  );
};

export default PatientDetailsPage;
