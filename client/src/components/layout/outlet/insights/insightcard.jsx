import React from "react";
import "./insights.css";
const KpiCard = ({ title, value }) => (
  <div className="card-container">
    <p className="card-containerp">{title}</p>
    <p className="card-containerp">{value}</p>
  </div>
);
export default KpiCard;