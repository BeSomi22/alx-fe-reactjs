import { useState } from "react";
import Search from "./components/Search";

export default function App() {
  const [results, setResults] = useState([]); // Store multiple search results
  const [error, setError] = useState("");

  // This will be passed to Search component
  const handleSearchResults = (users, errorMsg = "") => {
    setResults(users);
    setError(errorMsg);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>GitHub User Search</h1>

      {/* Pass the callback to Search */}
      <Search onResults={handleSearchResults} />

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results list */}
      <div style={{ marginTop: "20px" }}>
        {results.length > 0 &&
          results.map((user) => (
            <div
              key={user.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                style={{ width: "60px", borderRadius: "50%" }}
              />
              <h3>{user.login}</h3>
              <p>📍 {user.location || "Not specified"}</p>
              <p>📦 Public repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue" }}
              >
                View GitHub Profile
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import Search from "./components/Search";
// import { fetchAdvancedSearchResults } from "./services/githubService";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");

//   const handleSearch = async (username) => {
//     setError("");
//     setUser(null);
//     try {
//       const userData = await fetchUserData(username);
//       setUser(userData);
//     } catch {
//       setError("User not found or error fetching data.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>GitHub User Search</h1>
//       <Search onSearch={handleSearch} />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {user && (
//         <div style={{ marginTop: "20px" }}>
//           <img
//             src={user.avatar_url}
//             alt={user.login}
//             style={{ width: "100px", borderRadius: "50%" }}
//           />
//           <h2>{user.name || user.login}</h2>
//           <p>{user.bio}</p>
//           <a href={user.html_url} target="_blank" rel="noopener noreferrer">
//             View GitHub Profile
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
