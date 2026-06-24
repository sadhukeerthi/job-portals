import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ApplyJob() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to be logged in to apply for jobs");
        setLoading(false);
        return;
      }

      await API.post(
        "/applications",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess("✅ Application submitted successfully!");
      setJobId("");

      setTimeout(() => {
        navigate("/applications");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to submit application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-form">
          <h2>📝 Apply for Job</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleApply}>
            <div className="form-group">
              <label htmlFor="jobId">Enter Job ID</label>
              <input
                id="jobId"
                type="text"
                placeholder="Paste the job ID here"
                value={jobId}
                onChange={(e) => {
                  setJobId(e.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "🚀 Submit Application"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Or <a href="/jobs">browse available jobs</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ApplyJob;