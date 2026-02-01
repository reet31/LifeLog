import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./components/splashscreen";
import LandingPage from "./components/Landingpage";
import MainLayout from "./components/layout/Mainlayout";

import Home from "./components/layout/outlet/home/home";
import Diary from "./components/layout/outlet/diary/diary";
import Gallery from "./components/layout/outlet/gallery/gallery";
import Affirmations from "./components/layout/outlet/Affirmations/affirmation";
import Insights from "./components/layout/outlet/insights/insights";
import ProtectedRoute from "./protectedroutes";
import { checkauthentication } from "./utils/auth";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkauthentication();
      setIsAuthenticated(result);
      setLoading(false);
    };
    verifyAuth();
  }, []);

  if (showSplash || loading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/main" />
          ) : (
            <LandingPage setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* Protected Main */}
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="diary" element={<Diary />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="affirmations" element={<Affirmations />} />
          <Route path="insights" element={<Insights />} />
          {/* add others later */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
