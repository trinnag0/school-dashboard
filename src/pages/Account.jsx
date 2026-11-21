import React from 'react';

export default function Account() {
  const stats = [
    { label: "Total Revenue", value: "$45,200", trend: "+12%", color: "#10b981" },
    { label: "Pending Fees", value: "$12,800", trend: "-5%", color: "#f59e0b" },
    { label: "Expense (Monthly)", value: "$28,400", trend: "+8%", color: "#ef4444" },
  ];

  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Accounts & Finance</h1>
        <p style={{ opacity: 0.6 }}>Monitor school revenue, expenses, and fee collections.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {stats.map((s, i) => (
          <div key={i} style={cardStyle}>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#1e293b" }}>{s.value}</h2>
              <span style={{ fontSize: "0.85rem", color: s.color, fontWeight: "bold" }}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, padding: "2rem" }}>
        <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Recent Transactions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {[
            { item: "Library Books Purchase", amount: "-$1,200", date: "Sept 12", type: "Expense" },
            { item: "Term 1 Tuition Fee", amount: "+$5,000", date: "Sept 10", type: "Income" },
            { item: "Lab Equipment Repair", amount: "-$450", date: "Sept 08", type: "Expense" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "15px", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <p style={{ margin: 0, fontWeight: "600" }}>{t.item}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{t.date} • {t.type}</p>
              </div>
              <span style={{ fontWeight: "bold", color: t.amount.startsWith('+') ? "#10b981" : "#ef4444" }}>{t.amount}</span>
            </div>
          ))}
        </div>
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
