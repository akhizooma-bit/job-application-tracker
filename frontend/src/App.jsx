import { useEffect, useState } from "react";
import "./App.css";
import heroArt from "./assets/job-tracker-hero.png";

const API_URL = "http://localhost:5000/api/applications";

const emptyForm = {
  company: "",
  position: "",
  location: "",
  status: "Applied",
  appliedDate: new Date().toISOString().split("T")[0],
  notes: "",
};

function App() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [heroOpacity, setHeroOpacity] = useState(0.28);

  const fetchApplications = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setApplications(data);
    } catch {
      setMessage("Could not load applications. Check that the backend is running.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);
  useEffect(() => {
  const handleScroll = () => {
    setHeroOpacity(Math.max(0, 0.28 - window.scrollY / 900));
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMessage(editingId ? "Application updated." : "Application added.");
      setFormData(emptyForm);
      setEditingId(null);
      fetchApplications();
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (application) => {
    setFormData({
      company: application.company,
      position: application.position,
      location: application.location || "",
      status: application.status,
      appliedDate: application.appliedDate
        ? application.appliedDate.split("T")[0]
        : "",
      notes: application.notes || "",
    });
    setEditingId(application._id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job application?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("Application deleted.");
      fetchApplications();
    } catch {
      setMessage("Could not delete the application.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  };

  return (
    <main className="app">
      <img
  className="hero-art"
  src={heroArt}
  alt=""
  aria-hidden="true"
  style={{ opacity: heroOpacity }}
/>
      <header>
        <p className="eyebrow">JOB SEARCH ORGANIZER</p>
        <h1>Job Application Tracker</h1>
        <p className="subtitle">
          Track every application from first click to final offer.
        </p>
      </header>

      <section className="form-card">
        <h2>{editingId ? "Edit Application" : "Add New Application"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Company *
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                required
              />
            </label>

            <label>
              Position *
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bengaluru"
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </label>

            <label>
              Applied Date
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Recruiter details, follow-up date, interview notes..."
              rows="3"
            />
          </label>

          <div className="form-actions">
            <button type="submit">
              {editingId ? "Update Application" : "Add Application"}
            </button>
            {editingId && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="applications-section">
        <div className="section-heading">
          <h2>My Applications</h2>
          <span>{applications.length} total</span>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet.</p>
            <span>Add your first job application above.</span>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td>{application.company}</td>
                    <td>{application.position}</td>
                    <td>{application.location || "—"}</td>
                    <td>
                      <span
                        className={`status ${application.status.toLowerCase()}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td>
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td>{application.notes || "—"}</td>
                    <td className="actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(application)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(application._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
