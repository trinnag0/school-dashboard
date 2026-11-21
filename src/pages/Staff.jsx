import { useState, useEffect } from "react";

export default function Staff() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "TEACHER", email: "", phone: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/staff")
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    fetch("http://localhost:3000/api/staff", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStaff)
    })
    .then(res => res.json())
    .then(json => {
      setData([...data, json.data]);
      setShowAddForm(false);
      setNewStaff({ name: "", role: "TEACHER", email: "", phone: "" });
    });
  };

  const handleUpdate = (id, field, value) => {
    setData(data.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const saveStaff = (person) => {
    fetch(`http://localhost:3000/api/staff/${person.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    })
    .then(() => setEditingId(null))
    .catch(() => alert("Failed to save changes"));
  };

  return (
    <div>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Staff Directory</h1>
          <p style={{ opacity: 0.6 }}>Manage teachers and administrative personnel. Click to edit.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ ...saveButtonStyle, marginTop: 0, padding: "12px 20px" }}
        >
          {showAddForm ? "Cancel" : "Add New Staff"}
        </button>
      </header>

      {showAddForm && (
        <div style={{ ...cardStyle, marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
          <input placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} style={inputStyle} />
          <input placeholder="Email" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} style={inputStyle} />
          <input placeholder="Phone" value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} style={inputStyle} />
          <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} style={inputStyle}>
            <option value="TEACHER">Teacher</option>
            <option value="HOD">HOD</option>
            <option value="ADMIN">Admin</option>
            <option value="CLERK">Clerk</option>
            <option value="SENIOR TEACHER">Senior Teacher</option>
          </select>
          <button onClick={handleAdd} style={{ ...saveButtonStyle, gridColumn: "span 3" }}>Confirm Add Staff</button>
        </div>
      )}

      <div style={{

        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem"
      }}>
        {data.map(person => (
          <div key={person.id} style={cardStyle}>
            {editingId === person.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input 
                  value={person.name} 
                  onChange={(e) => handleUpdate(person.id, 'name', e.target.value)}
                  style={inputStyle}
                  placeholder="Name"
                />
                <input 
                  value={person.role} 
                  onChange={(e) => handleUpdate(person.id, 'role', e.target.value)}
                  style={inputStyle}
                  placeholder="Role"
                />
                <input 
                  value={person.phone || ""} 
                  onChange={(e) => handleUpdate(person.id, 'phone', e.target.value)}
                  style={inputStyle}
                  placeholder="Phone"
                />
                <button 
                  onClick={() => saveStaff(person)}
                  style={saveButtonStyle}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#7c3aed",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                  }}>
                    {person.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, color: "#1e293b" }}>{person.name}</h4>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#7c3aed", fontWeight: "600" }}>{person.role}</p>
                  </div>
                  <button 
                    onClick={() => setEditingId(person.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
                  >
                    ✏️
                  </button>
                </div>
                <p style={{ fontSize: "0.9rem", margin: "0.5rem 0", color: "#64748b" }}>📧 {person.email}</p>
                <p style={{ fontSize: "0.9rem", margin: "0.5rem 0", color: "#64748b" }}>📞 {person.phone || "No phone listed"}</p>
              </>
            )}
          </div>
        ))}
        {loading && <p>Loading staff...</p>}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  border: "1px solid #f1f5f9",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.01)",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "0.9rem"
};

const saveButtonStyle = {
  padding: "10px",
  background: "#7c3aed",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "5px"
};

