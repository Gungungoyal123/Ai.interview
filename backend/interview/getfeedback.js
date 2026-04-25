import { Feedback } from "../models/feedbackmodel.js";

export const getFeedbacks = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};