import React from 'react';

export default function Academics() {
  const sections = [
    { title: "Class Schedules", items: ["Grade 10A - Math (9:00 AM)", "Grade 11B - Physics (10:30 AM)", "Grade 12C - Chem (1:00 PM)"], icon: "🏫" },
    { title: "Subjects", items: ["Mathematics", "Physics", "Chemistry", "Biology", "English Literature"], icon: "📖" },
    { title: "Daily Routine", items: ["Morning Assembly: 8:00 AM", "Lunch Break: 12:00 PM", "Sports Hour: 3:00 PM"], icon: "📅" },
  ];

  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Academics & Planning</h1>
        <p style={{ opacity: 0.6 }}>Manage class schedules, subjects, and daily routines.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
        {sections.map((section, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2rem" }}>{section.icon}</span>
              <h3 style={{ margin: 0, color: "#1e293b" }}>{section.title}</h3>
            </div>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {section.items.map((item, j) => (
                <li key={j} style={{ 
                  padding: "12px 15px", 
                  borderBottom: j === section.items.length - 1 ? "none" : "1px solid #f1f5f9",
                  fontSize: "0.95rem",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed" }}></div>
                  {item}
                </li>
              ))}
            </ul>
            <button style={{ 
              marginTop: "1.5rem", 
              width: "100%", 
              padding: "12px", 
              borderRadius: "10px", 
              background: "#f5f3ff", 
              border: "none",
              color: "#7c3aed",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s"
            }}>
              View Full Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  border: "1px solid #f1f5f9",
  padding: "2rem",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
};
