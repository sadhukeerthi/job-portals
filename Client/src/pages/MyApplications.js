import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to be logged in to view applications");
        setLoading(false);
        return;
      }

      const res = await API.get("/applications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setApplications(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load applications. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      default:
        return "⏳";
    }
  };

  const filteredApplications = filterStatus === "all"
    ? applications
    : applications.filter(app => app.status?.toLowerCase() === filterStatus.toLowerCase());

  return (
    <>
      <Navbar />

      <div className="home-page">
        <div className="container">
          {/* Header */}
          <div className="hero-section">
            <h1>📋 My Applications</h1>
            <p>Track and manage all your job applications</p>
          </div>

          {/* Filter Section */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <label style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Filter by Status:</label>
            {['all', 'pending', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '0.5rem 1rem',
                  background: filterStatus === status ? 'var(--primary-color)' : 'var(--border-light)',
                  color: filterStatus === status ? 'white' : 'var(--text-dark)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
            <button onClick={fetchApplications} style={{ marginLeft: 'auto' }}>
              🔄 Refresh
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading your applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>No applications yet</h3>
              <p>You haven't applied for any jobs yet. Start exploring available opportunities!</p>
              <a href="/jobs" className="cta-button" style={{ marginTop: '1rem' }}>
                🔍 Browse Jobs
              </a>
            </div>
          ) : (
            <>
              <div style={{
                background: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                color: 'var(--text-light)',
                fontWeight: '500'
              }}>
                📊 Showing {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
              </div>
              {filteredApplications.map((app) => (
                <div key={app._id} className="application-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>
                        💼 {app.jobId?.title || "Job Title"}
                      </h3>
                      <p style={{ margin: '0.25rem 0', color: 'var(--text-light)' }}>
                        <strong>Company:</strong> {app.jobId?.company || "Company Name"}
                      </p>
                      <p style={{ margin: '0.25rem 0', color: 'var(--text-light)' }}>
                        <strong>Location:</strong> {app.jobId?.location || "Location"}
                      </p>
                      {app.jobId?.salary && (
                        <p style={{ margin: '0.25rem 0', color: 'var(--success-color)', fontWeight: '600' }}>
                          💰 {app.jobId.salary}
                        </p>
                      )}
                      <p style={{ margin: '1rem 0 0 0', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                        <strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`application-status ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)} {app.status?.charAt(0).toUpperCase() + app.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyApplications;