import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
  "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
  {
    text,
    model_id: "eleven_monolingual_v1"
  },
  {
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    responseType: "arraybuffer"
  }
);

    res.set({
      "Content-Type": "audio/mpeg"
    });

    res.send(response.data);

  } catch (error) {
    console.error("❌ Voice error full:", {
  status: error.response?.status,
  data: error.response?.data,
  message: error.message
});
    res.status(500).json({ error: "Voice failed" });
  }
});

export default router;