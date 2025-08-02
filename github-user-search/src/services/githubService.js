// import axios from "axios";

// const SEARCH_URL = "https://api.github.com/search/users";
// const API_URL = "https://api.github.com/users/";

// export const fetchUserData = async ({ username, location, minRepos }) => {
//   try {
//     //Build query string dynamically
//     let query = "";
//     if (username) query += `${username} in:login`;
//     if (location) query += `location:${location}`;
//     if (minRepos) query += `repos:>=${minRepos}`;

//     const response = await axios.get(
//       `${API_URL}?q=${encodeURIComponent(query)}`,
//       {
//         headers: {
//           Authorization: `token ${
//             import.meta.env.VITE_APP_GITHUB_API_KEY || ""
//           }`,
//         },
//       }
//     );
//     return response.data; //This contains "items" (list of users)
//   } catch (error) {
//     console.error("Error searching GitHub user:", error);
//     throw error;
//   }
// };
// export const searchUsers = async (query, page = 1, perPage = 5) => {
//   const response = await axios.get(
//     `${SEARCH_URL}?q=${encodeURIComponent(
//       query
//     )}&page=${page}&per_page=${perPage}`,
//     {
//       headers: {
//         Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
//       },
//     }
//   );
//   return response.data; // { total_count, items: [...] }
// };
import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";
const USER_URL = "https://api.github.com/users";

export const fetchAdvancedSearchResults = async ({
  username,
  location,
  minRepos,
}) => {
  try {
    // Build query string dynamically with spaces
    let query = "";
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    const response = await axios.get(
      `${SEARCH_URL}?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `token ${
            import.meta.env.VITE_APP_GITHUB_API_KEY || ""
          }`,
        },
      }
    );

    return response.data; // contains total_count and items
  } catch (error) {
    console.error("Error searching GitHub users:", error);
    throw error;
  }
};

// Optional helper: fetch details for a single user
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${USER_URL}/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user details:", error);
    throw error;
  }
};
