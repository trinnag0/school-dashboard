export default function StudentDetails() {
  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: "0 0 5px" }}>Students Details</h2>
        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Students <span style={{ margin: "0 5px" }}>/</span> <span style={{ color: "#7c3aed" }}>Students details</span>
        </div>
      </header>

      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        minHeight: "500px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#1e293b" }}>About Me</h3>
          <span style={{ cursor: "pointer", opacity: 0.4 }}>⋮</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }}>
          {/* Left Column - Personal Info */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
              <div style={{
                width: "90px",
                height: "90px",
                borderRadius: "15px",
                overflow: "hidden",
                background: "#f1f5f9"
              }}>
                <img src="https://i.pravatar.cc/150?u=jessia" alt="Student" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "1.4rem", color: "#1e293b" }}>Jessia Rose</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Users</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
              <InfoItem label="First Name" value="Jessia" />
              <InfoItem label="Last Name" value="Rose" />
              <InfoItem label="Father Name" value="Steve Jones" />
              <InfoItem label="Mother Name" value="Naomi Rose" />
              <InfoItem label="Father Occupation" value="Graphic Designer" />
              <InfoItem label="Mother Occupation" value="House Wife" />
              <InfoItem label="Date of Birth" value="07-08-2015" />
              <InfoItem label="Religion" value="Christian" />
              <InfoItem label="Class" value="Two" />
              <InfoItem label="Section" value="Red" />
              <InfoItem label="Roll" value="5648" />
              <InfoItem label="Admission Date" value="09-01-2021" />
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div style={sectionStyle}>
            <h4 style={{ marginBottom: "25px", fontSize: "1.1rem", color: "#1e293b" }}>Contact Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
              <InfoItem label="Primary Phone" value="(555) 123-4567" />
              <InfoItem label="Secondary Phone" value="(555) 987-6543" />
              <InfoItem label="Primary Email" value="jessia12@gmail.com" />
              <InfoItem label="Secondary Email" value="steve48@gmail.com" />
              <InfoItem label="Address" value="Springfield" />
              <InfoItem label="Street Address" value="Elm Street" />
              <InfoItem label="House Name" value="Meadowview" />
              <InfoItem label="House Number" value="62701" />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "40px" }}>
          <button style={{
            padding: "10px 25px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "white",
            color: "#64748b",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}>Remove</button>
          <button style={{
            padding: "10px 35px",
            borderRadius: "8px",
            border: "none",
            background: "#7c3aed",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer"
          }}>Edit</button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "0.95rem", color: "#1e293b", fontWeight: "500" }}>{value}</div>
    </div>
  );
}

const sectionStyle = {
  background: "white",
  padding: "5px"
};
