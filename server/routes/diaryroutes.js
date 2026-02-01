import express from "express";
import Diary from "../models/Diary.js";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

//insight route
router.get("/diary/kpis", authMiddleware, async (req, res) => {
  try{
    const userId = req.user_id;
    const totalEntries = await Diary.countDocuments({ user: userId });
    const startofMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const monthlyEntries = await Diary.countDocuments({
      user: userId,
      createdAt: { $gte: startofMonth },
    });
    const topMoodagg=await Diary.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id)
 } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    res.json({
      totalEntries,
      monthlyEntries,
      topMood: topMoodagg[0]?._id || null,
    });
  }catch(err){
    console.log("❌ ERROR FETCHING KPIS:", err);
    res.status(500).json({ error: "Failed to fetch KPIs" });

  }
});
router.post("/diary",authMiddleware, async (req, res) => {
  console.log("🔥 HIT POST /api/diary");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  console.log("COOKIES:", req.cookies);
console.log("USER:", req.user);

  try {
    const { text, mood } = req.body;

    if (!text || !mood) {
      return res.status(400).json({ error: "Text and mood are required" });
    }

    const entry = await Diary.create({
      userId: req.user.id,
      text,
      mood,
    });

    res.json(entry);
  } catch (err) {
    console.error("❌ ERROR CREATING DIARY:", err);
    res.status(500).json({ error: "Failed to create diary entry" });
  }
});

router.get("/diary", authMiddleware, async (req, res) => {
  try {
    const entries = await Diary.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch diary entries" });
  
  }});
router.delete("/diary/:id", authMiddleware, async (req, res) => {
  await Diary.deleteOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.json({ message: "Deleted" });
});
export default router;
