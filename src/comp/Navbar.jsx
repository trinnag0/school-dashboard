import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{
            background: "rgba(10, 10, 10, 0.9)",
            backdropFilter: "blur(10px)",
            color: "white",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000
        }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "-0.5px" }}>
                    Edu<span style={{ color: "#3b82f6" }}>Flow</span>
                </div>
            </Link>
            
            <div style={{ display: "flex", gap: "2rem", opacity: 0.8 }}>
                <Link to="/" style={linkStyle}>Dashboard</Link>
                <Link to="/attendance" style={linkStyle}>Attendance</Link>
                <Link to="/fees" style={linkStyle}>Fees</Link>
                <Link to="/staff" style={linkStyle}>Staff</Link>
            </div>

            <div style={{
                background: "#3b82f6",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                cursor: "pointer",
                fontWeight: "500"
            }}>
                Admin Portal
            </div>
        </nav>
    )
}

const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontSize: "0.95rem",
    transition: "opacity 0.2s"
};