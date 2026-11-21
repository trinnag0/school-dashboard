import { useState, useEffect } from "react";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/exams")
      .then(res => res.json())
      .then(json => {
        setExams(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Examination Center</h1>
        <p style={{ opacity: 0.6 }}>Track exam schedules, results, and performance.</p>
      </header>

      <div style={cardStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left" }}>
              <th style={thStyle}>Exam Name</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Duration</th>
              <th style={thStyle}>Room</th>
              <th style={thStyle}>Status</th>

              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={tdStyle}><strong>{exam.title}</strong></td>
                <td style={tdStyle}>{new Date(exam.date).toLocaleDateString()}</td>
                <td style={tdStyle}>{exam.duration}</td>
                <td style={tdStyle}>{exam.room}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: "4px 12px", 
                    borderRadius: "6px", 
                    fontSize: "0.8rem", 
                    background: new Date(exam.date) > new Date() ? "#eff6ff" : "#f1f5f9",
                    color: new Date(exam.date) > new Date() ? "#2563eb" : "#64748b"
                  }}>
                    {new Date(exam.date) > new Date() ? "Upcoming" : "Completed"}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button style={{ color: "#7c3aed", border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.01)",
};

const thStyle = { padding: "12px 15px", color: "#64748b", fontSize: "0.85rem", fontWeight: "600" };
const tdStyle = { padding: "15px", fontSize: "0.95rem", color: "#1e293b" };
