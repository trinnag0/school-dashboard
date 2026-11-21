import { useState, useEffect } from "react";

export default function Notice() {
  const [messages, setMessages] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages
    fetch("http://localhost:3000/api/messages")
      .then(res => res.json())
      .then(json => setMessages(json.data))
      .catch(() => {});

    // Fetch notices
    fetch("http://localhost:3000/api/notices")
      .then(res => res.json())
      .then(json => {
        setNotices(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Communication Hub</h1>
        <p style={{ opacity: 0.6 }}>Manage school notices and track parent notifications.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Left: Notices */}
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Latest Notices</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {notices.map((notice, i) => (
              <div key={i} style={{ ...cardStyle, borderLeft: `5px solid ${notice.priority === 'High' ? '#ef4444' : '#3b82f6'}` }}>
                <span style={{ fontSize: "0.7rem", color: "#7c3aed", fontWeight: "bold" }}>{notice.tag}</span>
                <h4 style={{ margin: "5px 0" }}>{notice.title}</h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Logs */}
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Sent Notifications (SMS/Auto)</h2>
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ padding: "15px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "5px" }}>
                    <span style={{ fontWeight: "bold", color: "#7c3aed" }}>To: {msg.recipient}</span>
                    <span style={{ color: "#94a3b8" }}>{new Date(msg.sentAt).toLocaleString()}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#1e293b" }}>{msg.content}</p>
                  <span style={{ fontSize: "0.7rem", color: "#10b981" }}>✓ {msg.status}</span>
                </div>
              ))}
              {loading && <p style={{ padding: "1rem" }}>Loading logs...</p>}
              {!loading && messages.length === 0 && <p style={{ padding: "1rem" }}>No messages sent yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
};

