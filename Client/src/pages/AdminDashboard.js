import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!job.title || !job.company || !job.location || !job.description) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to be logged in to add jobs");
        setLoading(false);
        return;
      }

      await API.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess("✅ Job posted successfully!");
      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <div className="container">
          {/* Header */}
          <div className="hero-section" style={{ marginBottom: '3rem' }}>
            <h1>⚙️ Admin Dashboard</h1>
            <p>Manage job postings and opportunities</p>
          </div>

          {/* Add Job Form */}
          <div className="admin-section">
            <h2>📝 Post a New Job</h2>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Job Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g., Senior Developer"
                  value={job.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="e.g., Tech Corp"
                    value={job.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="e.g., New York, NY"
                    value={job.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Salary (Optional)</label>
                  <input
                    id="salary"
                    type="text"
                    name="salary"
                    placeholder="e.g., $50,000 - $80,000"
                    value={job.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Job Description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  value={job.description}
                  onChange={handleChange}
                  required
                  rows="8"
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Posting job..." : "🚀 Post Job"}
              </button>
            </form>
          </div>

          {/* Tips Section */}
          <div className="admin-section" style={{ marginTop: '2rem' }}>
            <h2>💡 Tips for Posting Jobs</h2>
            <ul style={{ lineHeight: '1.8', color: 'var(--text-light)' }}>
              <li>✓ Use clear and descriptive job titles</li>
              <li>✓ Include specific location information</li>
              <li>✓ Mention salary range to attract qualified candidates</li>
              <li>✓ Write detailed job descriptions with key responsibilities</li>
              <li>✓ List required qualifications and experience</li>
              <li>✓ Highlight company benefits and perks</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;