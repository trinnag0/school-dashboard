import { useState, useEffect } from "react";

export default function Fees() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/fees")
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sendReminder = (id) => {
    fetch(`http://localhost:3000/api/fees/remind/${id}`, { method: 'POST' })
      .then(res => res.json())
      .then(res => alert(res.message || res.error))
      .catch(err => alert("Failed to send reminder"));
  };

  const totalDue = data.reduce((acc, curr) => acc + curr.amountDue, 0);
  const totalPaid = data.reduce((acc, curr) => acc + curr.amountPaid, 0);

  return (
    <div>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Fee Management</h1>
          <p style={{ opacity: 0.6 }}>Track student payments and outstanding balances.</p>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>TOTAL COLLECTED</p>
            <h3 style={{ margin: 0, color: "#10b981" }}>${totalPaid.toLocaleString()}</h3>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>OUTSTANDING</p>
            <h3 style={{ margin: 0, color: "#ef4444" }}>${(totalDue - totalPaid).toLocaleString()}</h3>
          </div>
        </div>
      </header>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Student</th>
              <th style={thStyle}>Term</th>
              <th style={thStyle}>Due</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(fee => (
              <tr key={fee.id} style={trStyle}>
                <td style={tdStyle}><strong>{fee.student?.name}</strong></td>
                <td style={tdStyle}>{fee.term}</td>
                <td style={tdStyle}>${fee.amountDue}</td>
                <td style={tdStyle}>${fee.amountPaid}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    background: fee.status === 'PAID' ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                    color: fee.status === 'PAID' ? "#10b981" : "#f59e0b"
                  }}>
                    {fee.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  {fee.status !== 'PAID' && (
                    <button 
                      onClick={() => sendReminder(fee.id)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "0.75rem",
                        background: "#7c3aed",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Remind Parent
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{ padding: "2rem", textAlign: "center" }}>Loading fee records...</p>}
      </div>
    </div>
  );
}

const tableContainerStyle = {
  background: "white",
  borderRadius: "16px",
  border: "1px solid #f1f5f9",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.01)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left"
};

const thStyle = {
  padding: "1.2rem 1.5rem",
  background: "#f8fafc",
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: "600",
  textTransform: "uppercase"
};

const trStyle = {
  borderBottom: "1px solid #f1f5f9"
};

const tdStyle = {
  padding: "1.2rem 1.5rem",
  fontSize: "0.95rem",
  color: "#1e293b"
};

