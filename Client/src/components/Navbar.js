import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💼</span>
          <span className="brand-text">JobHub</span>
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>
            <Link to="/jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              💻 Jobs
            </Link>

            {token ? (
              <>
                <Link to="/applications" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  📋 My Applications
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    ⚙️ Admin
                  </Link>
                )}
                <button className="nav-link logout-btn" onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  🔐 Login
                </Link>
                <Link to="/register" className="nav-link nav-link-register" onClick={() => setMobileMenuOpen(false)}>
                  ✍️ Register
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;