import { useState } from "react";
import { fetchUserData } from "../services/githubService"; // API call

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }

    setUsername("");
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            marginRight: "10px",
          }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <h2>{user.name || user.login}</h2>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}
