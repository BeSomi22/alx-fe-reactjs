import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { getUser } from "../services/githubApi";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setError("");
    setUser(null);
    try {
      const userData = await getUser(username);
      setUser(userData);
    } catch {
      setError("User not found or error fetching data.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

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
