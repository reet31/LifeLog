import express from "express";
import Diary from "../models/Diary.js";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

//insight route
router.get("/diary/kpis", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalEntries = await Diary.countDocuments({ userId });

    const startofMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthlyEntries = await Diary.countDocuments({
      userId,
      createdAt: { $gte: startofMonth },
    });

    const topMoodagg = await Diary.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const MoodCountsagg = await Diary.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
    ]);

    const moodCounts = MoodCountsagg.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      totalEntries,
      monthlyEntries,
      topMood: topMoodagg[0]?._id || null,
      moodCounts,
    });

  } catch (err) {
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
      userId: req.user._id,
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
    const entries = await Diary.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch diary entries" });
  
  }});
router.delete("/diary/:id", authMiddleware, async (req, res) => {
  await Diary.deleteOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  res.json({ message: "Deleted" });
});
//calender route 
router.get("/diary/calender",authMiddleware,async(req,res)=>{
  try{
    const userId=req.user._id;
    const calenderData=await Diary.aggregate([
      {$match:{
        userId:new mongoose.Types.ObjectId(userId)
      }},
      {$group:{
        _id:{
          $dateToString:{
            format: "%Y-%m-%d",
            date: "$createdAt"
          },
        },
        count:{$sum:1},
      }},
      {
      $sort:{_id:1},
      }
    ]);
    res.json(calenderData);
  }catch(err){
    console.log("error in fetching calender data",err);
    res.status(500).json({error:"Failed to fetch calender data"});
  }
});

// reflection route 
router.get("/diary/reflection",authMiddleware,async(req,res)=>{
  try{
    const userId=req.user._id;
    const reflections=await Diary.find({userId}).sort({createdAt:1});

    //writting streak
    let longeststreak=0;
    let currentstreak=1;

    for(let i=1;i<reflections.length;i++){
      const prevDate=new Date(reflections[i-1].createdAt);
      const currDate=new Date(reflections[i].createdAt);
      
      const difftime=Math.floor((currDate-prevDate)/(1000*60*60*24));

      if(difftime===1){
        currentstreak++;
        longeststreak=Math.max(longeststreak,currentstreak);
      }
      else if(difftime>1){
        currentstreak=1;
      }
    }
    //active days
    const dayCount={
      Sunday:0,
      Monday:0,
      Tuesday:0,
      Wednesday:0,
      Thursday:0,
      Friday:0,
      Saturday:0,
    };
    reflections
    .forEach((entry)=>{
      const day=new Date(entry.createdAt).toLocaleDateString("en-US",{
        weekday:"long",
      });
      dayCount[day]++;
    });
    const mostactivedays=Object.keys(dayCount).reduce((a,b)=>dayCount[a]>dayCount[b]?a:b);
    // consistency score

    const today=new Date();
    const startofmonth=new Date(today.getFullYear(),today.getMonth(),1);

    const dayspassed=Math.floor((today-startofmonth)/(1000*60*60*24))+1;

    const entriesThisMonth=reflections.filter((entry)=>new Date(entry.createdAt)>=startofmonth).length;

    const consistencyscore=dayspassed>0?Math.floor((entriesThisMonth/dayspassed)*100):0;
    
    res.json({reflections, longeststreak, mostactivedays, consistencyscore,});
  }catch(err){
    console.log("error in fetching reflections",err);
    res.status(500).json({error:"Failed to fetch reflections"});
  }
});
export default router;
