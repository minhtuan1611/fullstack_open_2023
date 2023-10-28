import { useParams } from "react-router-dom";
import { Typography, Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import HealthRatingBar from "./HealthRatingBar";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="App">
      <Typography variant="h4" gutterBottom>
        Patient ID: {id}
      </Typography>

      <Paper elevation={3} style={{ padding: "1em" }}>
        <Typography variant="h6">Patient Information</Typography>
      </Paper>

      <Box mt={3}>
        <Typography variant="h6">Health Rating</Typography>
        <HealthRatingBar rating={1} showText />
      </Box>

      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Patient List
      </Button>
    </div>
  );
};

export default PatientInfoPage;
