import { useState, useEffect } from "react";

export default function StudentList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", enrollment: "", grade: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/attendance") 
      .then(res => res.json())
      .then(json => {
        const students = [];
        const seen = new Set();
        json.data.forEach(r => {
          if (r.student && !seen.has(r.student.id)) {
            students.push(r.student);
            seen.add(r.student.id);
          }
        });
        setData(students);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    fetch("http://localhost:3000/api/students", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })
    .then(res => res.json())
    .then(json => {
      setData([...data, json.data]);
      setShowAddForm(false);
      setNewStudent({ name: "", enrollment: "", grade: "" });
    });
  };

  const handleUpdate = (id, field, value) => {
    setData(data.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveStudent = (student) => {
    fetch(`http://localhost:3000/api/students/${student.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    })
    .then(() => setEditingId(null))
    .catch(() => alert("Failed to save changes"));
  };

  return (
    <div>
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Student Directory</h1>
          <p style={{ opacity: 0.6 }}>Manage student information and academic status.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ ...actionButtonStyle, padding: "12px 20px" }}
        >
          {showAddForm ? "Cancel" : "Add New Student"}
        </button>
      </header>

      {showAddForm && (
        <div style={{ ...tableContainerStyle, padding: "20px", marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
          <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} style={inputStyle} />
          <input placeholder="Enrollment ID" value={newStudent.enrollment} onChange={e => setNewStudent({...newStudent, enrollment: e.target.value})} style={inputStyle} />
          <input placeholder="Grade (e.g. 10A)" value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value})} style={inputStyle} />
          <button onClick={handleAdd} style={{ ...actionButtonStyle, gridColumn: "span 3", background: "#7c3aed", color: "white" }}>Add Student to System</button>
        </div>
      )}

      <div style={tableContainerStyle}>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Enrollment</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Grade</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(student => (
              <tr key={student.id} style={trStyle}>
                <td style={tdStyle}>{student.enrollment}</td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input 
                      value={student.name} 
                      onChange={(e) => handleUpdate(student.id, 'name', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    <strong>{student.name}</strong>
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input 
                      value={student.grade} 
                      onChange={(e) => handleUpdate(student.id, 'grade', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    student.grade
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <button onClick={() => saveStudent(student)} style={actionButtonStyle}>Save</button>
                  ) : (
                    <button onClick={() => setEditingId(student.id)} style={actionButtonStyle}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{ padding: "2rem", textAlign: "center" }}>Loading students...</p>}
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

const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const thStyle = { padding: "1.2rem 1.5rem", background: "#f8fafc", fontSize: "0.85rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" };
const trStyle = { borderBottom: "1px solid #f1f5f9" };
const tdStyle = { padding: "1.2rem 1.5rem", fontSize: "0.95rem", color: "#1e293b" };
const inputStyle = { padding: "5px 10px", borderRadius: "5px", border: "1px solid #e2e8f0", width: "100%" };
const actionButtonStyle = { padding: "5px 15px", background: "#f5f3ff", color: "#7c3aed", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600" };
