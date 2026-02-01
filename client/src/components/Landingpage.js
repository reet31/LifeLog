import React, { useState } from "react";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import "./LandingPage.css";

const LandingPage = ({ setIsAuthenticated }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className={`landing-C ${showSignup || showLogin ? "blur" : ""}`}>
        <div className="left-side">
          <img src="d.png" height="550" width="450" alt="LifeLog" />
        </div>

        <div className="right-side">
          <h1 className="title">LifeLog</h1>
          <p className="subtitle">Track your moods, celebrate your days 🌷</p>

          <div className="auth-buttons">
            <button
              className="btn login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>

            <button
              className="btn signup-btn"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {showSignup && (
        <Signup onClose={() => setShowSignup(false)} />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      )}
    </>
  );
};

export default LandingPage;
