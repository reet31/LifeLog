import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import React from "react";
import "./insights.css";

import { useEffect, useState } from "react";
const Calender=()=>{
    const [CalenderData, setCalenderData] = useState([]);

    useEffect(() => {
        const fetchCalender=async()=>{
            try{
            const res=await axios.get(
                
                "http://localhost:5000/api/diary/calender",
                { withCredentials: true }
            );
        
            const formatted=res.data.map(item=>({
                date:item._id,
                count:item.count,
            }));
            setCalenderData(formatted);
    
    
    }catch(err){
        console.log("error in fetching calender data",err);
    }
    
    }
    fetchCalender();
}, []);
    return(
        <div className="calendar-container">
  <h2>Writing Activity Calendar</h2>

  <div className="calendar-scroll">
    <CalendarHeatmap
      startDate={new Date("2026-01-01")}
      endDate={new Date()}
      values={CalenderData}
      classForValue={(value) => {
        if (!value) return "color-empty";
        if (value.count === 1) return "color-scale-1";
        if (value.count === 2) return "color-scale-2";
        return "color-scale-3";
      }}
    />
  </div>
</div>


    );
}
export default Calender;