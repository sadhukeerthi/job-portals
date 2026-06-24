import { useNavigate } from "react-router-dom";
import API from "../services/api";

function JobCard({ job }) {
  const navigate = useNavigate();

  const applyJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await API.post(
        "/applications",
        { jobId: job._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Applied successfully! Check your applications to track the status.");
      navigate("/applications");
    } catch (error) {
      alert(error?.response?.data?.message || "❌ Application failed");
    }
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <div>
          <h3 className="job-title">💼 {job.title}</h3>
          <p className="job-company">🏢 {job.company}</p>
        </div>
        {job.featured && <span className="job-badge">⭐ Featured</span>}
      </div>

      <div className="job-details">
        <div className="job-detail">
          <span>📍 {job.location}</span>
        </div>
        {job.salary && (
          <div className="job-detail" style={{ color: '#06d6a0', fontWeight: '600' }}>
            <span>💰 {job.salary}</span>
          </div>
        )}
        <div className="job-detail">
          <span>📅 Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {job.description && (
        <p className="job-description">
          {job.description.substring(0, 200)}
          {job.description.length > 200 ? "..." : ""}
        </p>
      )}

      <div className="job-footer">
        <div className="job-salary">
          {job.jobType && <span className="job-badge" style={{ marginRight: '0.5rem' }}>
            {job.jobType === 'full-time' ? '⏰ Full-time' : '📌 ' + job.jobType}
          </span>}
        </div>
        <button className="apply-button" onClick={applyJob}>
          🚀 Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;