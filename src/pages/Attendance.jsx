import { useState, useEffect } from "react";

export default function Attendance() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('register');
  const [attendanceState, setAttendanceState] = useState({});

  useEffect(() => {
    fetchLogs();
    fetchStudents();
  }, []);

  const fetchLogs = () => {
    fetch("http://localhost:3000/api/attendance")
      .then(res => res.json())
      .then(json => {
        setData(json.data);
      })
      .catch(() => {});
  };

  const fetchStudents = () => {
    fetch("http://localhost:3000/api/students")
      .then(res => res.json())
      .then(json => {
        setStudents(json.data);
        const initialState = {};
        json.data.forEach(s => initialState[s.id] = 'PRESENT');
        setAttendanceState(initialState);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'PRESENT' ? 'ABSENT' : 'PRESENT';
    fetch(`http://localhost:3000/api/attendance/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
      setData(data.map(r => r.id === id ? { ...r, status: newStatus } : r));
    });
  };

  const handleCheckboxChange = (studentId) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
    }));
  };

  const submitRegister = async () => {
    // We assume lectureId: 1 for demonstration purposes as seeded.
    for (const studentId of Object.keys(attendanceState)) {
      await fetch("http://localhost:3000/api/attendance/mark", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: parseInt(studentId),
          lectureId: null, 
          status: attendanceState[studentId],
          remarks: "Daily register"
        })

      }).catch(e => console.error(e));
    }
    alert("Attendance Register Submitted Successfully!");
    fetchLogs(); // Refresh logs
    setActiveTab('logs');
  };

  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Attendance</h1>
        <p style={{ opacity: 0.6 }}>Manage daily student register and view past logs.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('register')}
          style={{ ...tabStyle, background: activeTab === 'register' ? '#7c3aed' : 'white', color: activeTab === 'register' ? 'white' : '#64748b' }}
        >
          Daily Register
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          style={{ ...tabStyle, background: activeTab === 'logs' ? '#7c3aed' : 'white', color: activeTab === 'logs' ? 'white' : '#64748b' }}
        >
          Attendance Logs
        </button>
      </div>

      <div style={tableContainerStyle}>
        {activeTab === 'register' ? (
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Student Name</th>
                  <th style={thStyle}>Enrollment</th>
                  <th style={thStyle}>Grade</th>
                  <th style={thStyle}>Present?</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} style={trStyle}>
                    <td style={tdStyle}><strong>{student.name}</strong></td>
                    <td style={tdStyle}>{student.enrollment}</td>
                    <td style={tdStyle}>{student.grade}</td>
                    <td style={tdStyle}>
                      <input 
                        type="checkbox" 
                        checked={attendanceState[student.id] === 'PRESENT'}
                        onChange={() => handleCheckboxChange(student.id)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#7c3aed' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={submitRegister}
                style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Submit Attendance
              </button>
            </div>
            {loading && <p style={{ padding: "2rem", textAlign: "center" }}>Loading students...</p>}
          </div>
        ) : (
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Student</th>
                  <th style={thStyle}>Subject</th>
                  <th style={thStyle}>Status (Click to toggle)</th>
                </tr>
              </thead>
              <tbody>
                {data.map(record => (
                  <tr key={record.id} style={trStyle}>
                    <td style={tdStyle}>{new Date(record.date).toLocaleDateString()}</td>
                    <td style={tdStyle}><strong>{record.student?.name}</strong></td>
                    <td style={tdStyle}>{record.lecture?.subject?.name || 'General'}</td>
                    <td style={tdStyle}>
                      <span 
                        onClick={() => toggleStatus(record.id, record.status)}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          background: record.status === 'PRESENT' ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                          color: record.status === 'PRESENT' ? "#10b981" : "#ef4444",
                          cursor: "pointer",
                          transition: "0.2s",
                          fontWeight: "bold"
                        }}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && !loading && <p style={{ padding: "2rem", textAlign: "center" }}>No logs available.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const tabStyle = {
  padding: '10px 24px',
  borderRadius: '24px',
  border: '1px solid #f1f5f9',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s'
};

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


