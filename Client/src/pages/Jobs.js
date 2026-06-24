import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs");
      setJobs(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load jobs. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || job.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Navbar />

      <div className="home-page">
        <div className="container">
          {/* Header */}
          <div className="hero-section">
            <h1>💻 Available Opportunities</h1>
            <p>Find and apply for your dream job today</p>
          </div>

          {/* Search and Filter */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div className="form-group">
              <label htmlFor="search">Search Jobs</label>
              <input
                id="search"
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Filter by Location</label>
              <input
                id="location"
                type="text"
                placeholder="Enter location..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={fetchJobs} style={{ width: '100%' }}>
                🔄 Refresh
              </button>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">😢</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria or check back later for new opportunities.</p>
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
                📊 Showing {filteredJobs.length} opportunity{filteredJobs.length !== 1 ? 'ies' : ''}
              </div>
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Jobs;