import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Course from "./Course";

export default function App() {
  const [view, setView] = useState("landing");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("learnclaw_theme") || "dark"; } catch { return "dark"; }
  });

  useEffect(() => {
    try { localStorage.setItem("learnclaw_theme", theme); } catch {}
    document.body.style.background = theme === "light" ? "#F5F3EF" : "#111318";
  }, [theme]);

  function toggleTheme() {
    setTheme(t => t === "dark" ? "light" : "dark");
  }

  return view === "landing"
    ? <LandingPage onEnter={() => setView("course")} theme={theme} onToggleTheme={toggleTheme} />
    : <Course onBack={() => setView("landing")} theme={theme} onToggleTheme={toggleTheme} />;
}
