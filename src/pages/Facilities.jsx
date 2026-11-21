import { useState, useEffect } from "react";

export default function Facilities() {
  const [transport, setTransport] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/transport").then(res => res.json()),
      fetch("http://localhost:3000/api/hostels").then(res => res.json())
    ]).then(([transportData, hostelData]) => {
      setTransport(transportData.data);
      setHostels(hostelData.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);


  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>School Facilities</h1>
        <p style={{ opacity: 0.6 }}>Manage transportation, boarding, and other amenities.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
        {/* Transport Card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "2rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🚌</span>
            <h2 style={{ margin: 0, color: "#2d1b69" }}>Transport Services</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {transport.map((route, idx) => (
              <div key={idx} style={itemContainerStyle}>
                <div>
                  <h4 style={{ margin: 0, color: "#1e293b" }}>{route.routeName}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Vehicle: {route.vehicleNo} | Driver: {route.driverName}</p>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#7c3aed" }}>{route.driverPhone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hostel Card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "2rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🏠</span>
            <h2 style={{ margin: 0, color: "#2d1b69" }}>Hostel Management</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {hostels.map((hostel, idx) => (
              <div key={idx} style={itemContainerStyle}>
                <div>
                  <h4 style={{ margin: 0, color: "#1e293b" }}>{hostel.name} ({hostel.type})</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>{hostel.available} Rooms Available</p>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#7c3aed" }}>Capacity: {hostel.capacity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "24px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
};

const itemContainerStyle = { 
  padding: "15px", 
  borderRadius: "12px", 
  background: "#f8fafc", 
  display: "flex", 
  justifyContent: "space-between",
  alignItems: "center"
};

