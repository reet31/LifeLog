import axios from "axios";
import { useEffect, useState } from "react";
import KpiCard from "./insightcard";
import "./insights.css";
import Calender from "./Calender.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DiaryKpis = () => {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    const fetchKpis = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/diary/kpis",
        { withCredentials: true }
      );
      setKpis(res.data);
    };

    fetchKpis();
  }, []);
  const [reflections,setreflections]=useState({});
  useEffect(()=>{
    axios.get("http://localhost:5000/api/diary/reflection",{withCredentials:true})
    .then((response)=>{
      setreflections(response.data);
    })
    .catch((error)=>{
      console.error("Error fetching reflections:",error);
    });
  },[]);
  if (!kpis) return <p>Loading...</p>;
  const moodData = Object.entries(kpis.moodCounts || {}).map(
    ([mood, count]) => ({ mood, count })
  );

  return (
    <>
    <h1>Insights</h1>
    <p className="subheading">Your diary at a glance — moods, entries, and more</p>
  <div className="KpisSection">
    
      

    <div className="KpisContainer">
      <p>KPI Summary</p>
      <div className="kpis">
        <KpiCard title="Total Entries" value={kpis.totalEntries} />
      <KpiCard title="This Month" value={kpis.monthlyEntries} />
      <KpiCard title="Top Mood" value={(kpis.topMood==null)?"None":kpis.topMood} />
      </div>
      
    </div>
   

    
          <div className="MoodChartSection">
            <h2>Mood Distribution</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={moodData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    barCategoryGap="55%">
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="mood" tick={{ fontSize: 18 }} />
    <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
    <Tooltip formatter={(value) => [`${value} entries`, "Count"]} />
    <Bar dataKey="count" barSize={45}>
  {moodData.map((entry, index) => (
    <Cell
      key={index}
      fill={moodData[entry.mood] || "#ee8dad"}
    />
  ))}
</Bar>   
  </BarChart>
</ResponsiveContainer>

      
      
    </div>
    <div className="CalenderSection">
      <Calender />
    </div>
    <div className="ReflectionSection">
      <h2>Reflection</h2>
      <p>🔥 Longest streak: {reflections.longeststreak} days</p>
<p>📅 Most active day: {reflections.mostactivedays}</p>
<p>🌱 Consistency score: {reflections.consistencyscore}%</p>

    </div>
     </div>
    </>
)
};

export default DiaryKpis;
