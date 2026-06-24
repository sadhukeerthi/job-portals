import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      
      <div className="home-page">
        <div className="container">
          {/* Hero Section */}
          <div className="hero-section">
            <h1>🚀 Find Your Dream Job</h1>
            <p>Discover exciting career opportunities and grow your professional journey with us</p>
            <Link to="/jobs" className="cta-button">
              🔍 Browse Jobs
            </Link>
          </div>

          {/* Features Section */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Wide Range of Jobs</h3>
              <p>Browse through thousands of job opportunities from top companies across various industries.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Application</h3>
              <p>Apply for jobs in seconds with our simple and fast application process.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>Keep track of all your job applications and their status in one place.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Perfect Match</h3>
              <p>Find jobs that match your skills and experience perfectly.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Quality Positions</h3>
              <p>Access premium job listings from verified and trusted companies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Career Support</h3>
              <p>Get help and guidance throughout your job search journey.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="hero-section" style={{ marginTop: '3rem' }}>
            <h2>Ready to Start Your Career?</h2>
            <p>Join thousands of job seekers who have found their perfect job</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/jobs" className="cta-button">
                📋 View All Jobs
              </Link>
              <Link to="/register" className="cta-button" style={{ background: '#00b4d8' }}>
                ✍️ Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;