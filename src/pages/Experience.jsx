import "../styles/experience.css";

export default function Experience() {
  return (
    <div className="experience" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "2rem",
        color: "var(--ivory)",
        opacity: 0.5,
      }}>
        Phase 2 — 3D World
      </p>
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}>
        Coming next
      </p>
    </div>
  );
}