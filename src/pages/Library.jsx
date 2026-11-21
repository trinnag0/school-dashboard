import { useState, useEffect } from "react";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/library")
      .then(res => res.json())
      .then(json => {
        setBooks(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#2d1b69" }}>Library Resources</h1>
        <p style={{ opacity: 0.6 }}>Access digital and physical learning materials.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {books.map((book, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{book.title}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.6 }}>{book.author}</p>
              </div>
              <span style={{ 
                padding: "4px 10px", 
                borderRadius: "20px", 
                fontSize: "0.75rem", 
                fontWeight: "600",
                background: book.available ? "#dcfce7" : "#fee2e2",
                color: book.available ? "#166534" : "#991b1b"
              }}>
                {book.available ? "Available" : "Borrowed"}
              </span>

            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Category: <strong>{book.category}</strong>
            </div>
            <button style={{ 
              marginTop: "1.5rem", 
              width: "100%", 
              padding: "10px", 
              borderRadius: "8px", 
              border: "1px solid #7c3aed", 
              background: "transparent", 
              color: "#7c3aed",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              Reserve Book
            </button>
          </div>
        ))}
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
