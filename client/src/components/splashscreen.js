import React from "react";
import "./splashscreen.css";

const SplashScreen = () => {
  const text = "LifeLog";

  return (
    <div className="splash-container">
      <h1 className="splash-title">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="char"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SplashScreen;
