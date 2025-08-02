// import { useState } from "react";
// import { fetchUserData } from "../services/githubService"; // API call

// export default function Search() {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username.trim()) return;

//     setLoading(true);
//     setError("");
//     setUser(null);

//     try {
//       const userData = await fetchUserData(username);
//       setUser(userData);
//     } catch {
//       setError("Looks like we cant find the user");
//     } finally {
//       setLoading(false);
//     }

//     setUsername("");
//   };

//   return (
//     <div>
//       {/* Search Form */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Search GitHub username..."
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             width: "250px",
//             marginRight: "10px",
//           }}
//         />
//         <button type="submit" style={{ padding: "10px 20px" }}>
//           Search
//         </button>
//       </form>

//       {/* Conditional Rendering */}
//       {loading && <p>Loading...</p>}
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
import { useState } from "react";
import {
  fetchAdvancedSearchResults,
  getUserDetails,
} from "../services/githubService";

export default function Search() {
  // Search form state
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  // Results & loading/error state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchResults = async (pageNum = 1, append = false) => {
    setLoading(true);
    setError("");

    try {
      // Get search results
      const searchData = await fetchAdvancedSearchResults({
        username,
        location,
        minRepos,
      });

      setHasMore(searchData.items.length > 0);

      // Get detailed info for each user
      const detailedUsers = await Promise.all(
        searchData.items.map(async (user) => {
          const details = await getUserDetails(user.login);
          return {
            ...user,
            location: details.location,
            public_repos: details.public_repos,
          };
        })
      );

      // Append or replace results
      setResults((prev) =>
        append ? [...prev, ...detailedUsers] : detailedUsers
      );
    } catch {
      setError("Looks like we can't find any users.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() && !location.trim() && !minRepos.trim()) return;
    setPage(1);
    fetchResults(1, false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(nextPage, true);
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "10px", marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="Min repos..."
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          style={{ padding: "10px", marginRight: "5px", width: "120px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>

      {/* Loading/Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results */}
      {results.map((user) => (
        <div
          key={user.id}
          style={{
            marginTop: "15px",
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

      {/* Load More */}
      {hasMore && !loading && results.length > 0 && (
        <button
          onClick={loadMore}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
