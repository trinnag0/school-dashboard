export default function TopBar() {
  return (
    <div style={{
      height: "70px",
      background: "white",
      borderBottom: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      position: "fixed",
      top: 0,
      left: "260px",
      right: 0,
      zIndex: 90
    }}>
      <div style={{ position: "relative", width: "400px" }}>
        <input 
          type="text" 
          placeholder="What do you want to find?" 
          style={{
            width: "100%",
            padding: "10px 15px 10px 40px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            outline: "none",
            fontSize: "0.9rem"
          }}
        />
        <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}>🔍</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <div style={{ display: "flex", gap: "15px" }}>
          <span style={{ fontSize: "1.2rem", cursor: "pointer", opacity: 0.6 }}>🔔</span>
          <span style={{ fontSize: "1.2rem", cursor: "pointer", opacity: 0.6 }}>💬</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid #e2e8f0", paddingLeft: "25px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>Priscilla Lily</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Admin</div>
          </div>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#e2e8f0",
            overflow: "hidden"
          }}>
            <img src="https://ui-avatars.com/api/?name=Priscilla+Lily&background=7c3aed&color=fff" alt="User" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
