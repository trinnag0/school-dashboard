import { useState, useEffect } from "react";

export default function Dashboard() {
  const [budgetData, setBudgetData] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch main annual budget
    fetch("http://localhost:3000/api/budget")
      .then((res) => res.json())
      .then((data) => {
        setBudgetData(data.data);
      })
      .catch(() => {});

    // Fetch Board Members
    fetch("http://localhost:3000/api/staff")
      .then(res => res.json())
      .then(json => {
        const boardRoles = ['HEAD', 'CHANCELLOR', 'DEPUTY', 'CHAPLIN', 'CLERK', 'SENIOR TEACHER'];
        const filtered = json.data.filter(m => boardRoles.includes(m.role));
        setBoardMembers(filtered);
      })
      .catch(() => {});

    setLoading(false);
  }, []);

  const getIcon = (role) => {
    const icons = {
      'HEAD': '👩‍💼',
      'CHANCELLOR': '👔',
      'DEPUTY': '🏫',
      'CHAPLIN': '⛪',
      'SENIOR TEACHER': '🎓',
      'CLERK': '📁'
    };
    return icons[role] || '👤';
  };

  const deptBudgets = [
    { name: "Science", total: 300000, spent: 120000, color: "#7c3aed" },
    { name: "Arts", total: 200000, spent: 50000, color: "#3b82f6" },
    { name: "Commerce", total: 250000, spent: 80000, color: "#10b981" },
  ];

  return (
    <div>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#2d1b69" }}>School Overview</h1>
        <p style={{ opacity: 0.6 }}>Real-time administrative data and financial health.</p>
      </header>

      {/* Main Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem"
      }}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Annual Budget</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>
            ${budgetData?.amount?.toLocaleString() || "1,500,000"}
          </p>
          <p style={{ opacity: 0.5, fontSize: "0.9rem" }}>Total allocated for 2024</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Total Expenses</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>
            ${budgetData?.spent?.toLocaleString() || "450,000"}
          </p>
          <p style={{ opacity: 0.5, fontSize: "0.9rem" }}>Spent to date</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Remaining Funds</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6" }}>
            ${((budgetData?.amount || 1500000) - (budgetData?.spent || 450000))?.toLocaleString()}
          </p>
          <p style={{ opacity: 0.5, fontSize: "0.9rem" }}>Available for allocation</p>
        </div>
      </div>

      {/* Administrative Board Section */}
      <h2 style={{ fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1.5rem", color: "#2d1b69" }}>Administrative Board</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
        gap: "1.5rem",
        marginBottom: "3rem" 
      }}>
        {boardMembers.length > 0 ? boardMembers.map((member, i) => (
          <div key={i} style={{ ...cardStyle, padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{getIcon(member.role)}</div>
            <h4 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>{member.name}</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#7c3aed", fontWeight: "600" }}>{member.role}</p>
          </div>
        )) : (
          <p style={{ color: "#64748b" }}>Loading board information...</p>
        )}
      </div>

      {/* Departmental Breakdown */}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#2d1b69" }}>Departmental Budgets</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
        {deptBudgets.map((dept, i) => (
          <div key={i} style={{ ...cardStyle, borderTop: `6px solid ${dept.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>{dept.name} Dept</h3>
              <span style={{ fontWeight: "600", color: dept.color }}>{Math.round((dept.spent / dept.total) * 100)}% Used</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", marginBottom: "1rem" }}>
              <div style={{ width: `${(dept.spent / dept.total) * 100}%`, height: "100%", background: dept.color, borderRadius: "4px" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "#64748b" }}>Spent: ${dept.spent.toLocaleString()}</span>
              <span style={{ fontWeight: "600" }}>Total: ${dept.total.toLocaleString()}</span>
            </div>
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
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.01)",
};

const cardTitle = {
  fontSize: "0.85rem",
  marginBottom: "1rem",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontWeight: "600"
};



