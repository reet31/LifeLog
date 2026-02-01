import axios from "axios";
import { useEffect, useState } from "react";
import KpiCard from "./insightcard";
import "./insights.css";

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

  if (!kpis) return <p>Loading...</p>;

  return (
    <>
  <div className="KpisSection">
    <h1>Insights</h1>
    <p className="subheading">Your diary at a glance — moods, entries, and more</p>
      </div>

    <div className="KpisContainer">
      <KpiCard title="Total Entries" value={kpis.totalEntries} />
      <KpiCard title="This Month" value={kpis.monthlyEntries} />
      <KpiCard title="Top Mood" value={kpis.topMood} />
    </div>
    </>
);
};

export default DiaryKpis;
