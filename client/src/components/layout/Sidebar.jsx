import { NavLink } from "react-router-dom";
import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1 className="logo">LifeLog</h1>

      <nav>
        <NavLink to="/main">🏠 Home</NavLink>
        <NavLink to="/main/diary">📖 Diary</NavLink>
        <NavLink to="/main/gallery">🖼 Gallery</NavLink>
        <NavLink to="/main/affirmations">🌸 Affirmations</NavLink>
        <NavLink to="/main/insights">📊 Insights</NavLink>
        <NavLink to="/main/help">❓ Help</NavLink>
      </nav>

      <button className="logout">⏻ Logout</button>
    </aside>
  );
};

export default Sidebar;
