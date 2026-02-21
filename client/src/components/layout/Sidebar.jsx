import { NavLink } from "react-router-dom";
import "./layout.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
 const handleLogout = async () => {
  await fetch("http://localhost:5000/logout", {
    method: "POST",
    credentials: "include"
  });

  navigate("", { replace: true });
};
  return (
    <aside className="sidebar">
      <h1 className="logo">LifeLog</h1>

      <nav>
        <NavLink to="/main"><FaHome /> Home</NavLink>
       <NavLink to="/main/diary">
  <FaBook /> Diary
</NavLink>

<NavLink to="/main/gallery">
  <FaImages /> Gallery
</NavLink>

<NavLink to="/main/affirmations">
  <FaQuoteRight /> Affirmations
</NavLink>

<NavLink to="/main/insights">
  <FaChartLine /> Insights
</NavLink>

<NavLink to="/main/help">
  <FaQuestionCircle /> Help
</NavLink>
      </nav>

      <button className="logout" onClick={handleLogout}>⏻ Logout</button>

    </aside>
  );
};

export default Sidebar;
