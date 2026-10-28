const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Disease Detector API is running"
  });
});

app.post("/api/check", (req, res) => {
  const { symptoms } = req.body;

  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({
      message: "Please select at least one symptom."
    });
  }

  const validSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Fatigue",
    "Sore throat",
    "Body pain"
  ];

  if (symptoms.some((s) => !validSymptoms.includes(s))) {
    return res.status(400).json({
      message: "Invalid symptom selected."
    });
  }

  res.json({
    message:
      "Your selected symptoms: " +
      symptoms.join(", ") +
      ". These symptoms can have several causes. This app cannot diagnose a disease. Please consult a healthcare professional."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
