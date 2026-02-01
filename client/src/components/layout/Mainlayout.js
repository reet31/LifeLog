import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./layout.css";

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />   {/* child compo */}
      </main>
    </div>
  );
};

export default MainLayout;
