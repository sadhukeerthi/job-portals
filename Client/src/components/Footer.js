import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>💼 JobHub</h3>
          <p>Your gateway to finding the perfect job opportunity.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Browse Jobs</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 contact@jobhub.com</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>📍 123 Career Street, Job City</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} JobHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;