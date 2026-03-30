import { useState, useRef } from "react";
import { gsap } from "gsap";
import Landing from "./pages/Landing";
import Experience from "./pages/Experience";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const wrapperRef = useRef(null);

  const handleEnter = () => {
    setPage("experience");
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: "power2.inOut", delay: 0.1 }
    );
  };

  return (
    <div className="page-wrapper" ref={wrapperRef} style={{ opacity: 1 }}>
      {page === "landing"    && <Landing   onEnter={handleEnter} />}
      {page === "experience" && <Experience />}
    </div>
  );
}