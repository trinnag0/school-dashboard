import { Routes, Route } from "react-router-dom";
import Sidebar from "./comp/Sidebar";
import TopBar from "./comp/TopBar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Staff from "./pages/Staff";
import StudentDetails from "./pages/StudentDetails";
import StudentList from "./pages/StudentList";
import Library from "./pages/Library";
import Academics from "./pages/Academics";
import Exams from "./pages/Exams";
import Notice from "./pages/Notice";
import Facilities from "./pages/Facilities";
import Account from "./pages/Account";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      color: "#1e293b",
      fontFamily: "'Outfit', 'Inter', sans-serif",
      display: "flex"
    }}>
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: "260px" }}>
        {/* TopBar - Fixed */}
        <TopBar />

        {/* Dynamic Content */}
        <main style={{ marginTop: "70px", padding: "40px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/student-details" element={<StudentDetails />} />

            <Route path="/library" element={<Library />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}