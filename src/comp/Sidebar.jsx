import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Home", icon: "🏠", path: "/" },
    { label: "Fees Management", icon: "💰", path: "/fees" },
    { label: "Students", icon: "🎓", path: "/attendance", subItems: ["All Students", "Student Details"] },
    { label: "Teachers", icon: "👨‍🏫", path: "/staff" },
    { label: "Library", icon: "📚", path: "/library" },
    { label: "Account", icon: "👤", path: "/account" },
    { label: "Class", icon: "🏫", path: "/academics" },
    { label: "Subject", icon: "📖", path: "/academics" },
    { label: "Routine", icon: "📅", path: "/academics" },
    { label: "Attendance", icon: "📝", path: "/attendance" },
    { label: "Exam", icon: "✍️", path: "/exams" },
    { label: "Notice", icon: "🔔", path: "/notice" },
    { label: "Transport", icon: "🚌", path: "/facilities" },
  ];



  return (
    <div style={{
      width: "260px",
      background: "white",
      height: "100vh",
      borderRight: "1px solid #f0f0f0",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      <div style={{ padding: "0 25px 30px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "35px", height: "35px", background: "#7c3aed", borderRadius: "8px" }}></div>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2d1b69" }}>EduFlow</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 15px" }}>
        {menuItems.map((item, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <Link 
              to={item.path} 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 15px",
                borderRadius: "10px",
                textDecoration: "none",
                color: location.pathname === item.path ? "#7c3aed" : "#64748b",
                background: location.pathname === item.path ? "#f5f3ff" : "transparent",
                fontWeight: location.pathname === item.path ? "600" : "400",
                fontSize: "0.95rem"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
              {item.label}
            </Link>
            {item.subItems && item.label === "Students" && (
              <div style={{ paddingLeft: "45px", marginTop: "5px" }}>
                {item.subItems.map((sub, idx) => (
                  <Link 
                    key={idx} 
                    to={sub === "Student Details" ? "/student-details" : sub === "All Students" ? "/students" : "/attendance"}
                    style={{ 
                      display: "block",
                      padding: "8px 0", 
                      fontSize: "0.85rem", 
                      color: (sub === "Student Details" && location.pathname === "/student-details") ? "#7c3aed" : "#94a3b8",
                      fontWeight: (sub === "Student Details" && location.pathname === "/student-details") ? "600" : "400",
                      cursor: "pointer",
                      textDecoration: "none"
                    }}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
