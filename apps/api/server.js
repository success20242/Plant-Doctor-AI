require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");

const { smartDiagnosis } = require("../../services/smart-engine");
const { getRecommendations } = require("../../services/marketplace");
const { sendTelegram } = require("../../services/telegram");
const { createPayment } = require("../../services/payments");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

// Analyze endpoint
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const aiRes = await axios.post(
      process.env.AI_URL,
      req.file.buffer,
      { headers: { "Content-Type": "application/octet-stream" } }
    );

    const diagnosis = smartDiagnosis(aiRes.data, req.body);
    const products = getRecommendations(diagnosis.disease);

    await sendTelegram(`New diagnosis: ${diagnosis.disease}`);

    res.json({
      ...diagnosis,
      marketplace: products
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payment route
app.post("/pay", async (req, res) => {
  const order = await createPayment(req.body.amount);
  res.json(order);
});

app.listen(5000, () => console.log("API running"));
