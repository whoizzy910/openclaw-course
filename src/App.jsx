import { useState } from "react";
import LandingPage from "./LandingPage";
import Course from "./Course";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "course"

  return view === "landing"
    ? <LandingPage onEnter={() => setView("course")} />
    : <Course onBack={() => setView("landing")} />;
}
