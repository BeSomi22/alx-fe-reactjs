// import axios from "axios";

// const SEARCH_URL = "https://api.github.com/search/users";
// const USER_URL = "https://api.github.com/users";

// export const fetchAdvancedSearchResults = async ({
//   username,
//   location,
//   minRepos,
// }) => {
//   try {
//     // Build query string dynamically with spaces
//     let query = "";
//     if (username) query += `${username} in:login `;
//     if (location) query += `location:${location} `;
//     if (minRepos) query += `repos:>=${minRepos} `;

//     const response = await axios.get(
//       `${SEARCH_URL}?q=${encodeURIComponent(query)}`,
//       {
//         headers: {
//           Authorization: `token ${
//             import.meta.env.VITE_APP_GITHUB_API_KEY || ""
//           }`,
//         },
//       }
//     );

//     return response.data; // contains total_count and items
//   } catch (error) {
//     console.error("Error searching GitHub users:", error);
//     throw error;
//   }
// };

// // Optional helper: fetch details for a single user
// export const getUserDetails = async (username) => {
//   try {
//     const response = await axios.get(`${USER_URL}/${username}`, {
//       headers: {
//         Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching GitHub user details:", error);
//     throw error;
//   }
// };

import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";
const USER_URL = "https://api.github.com/users";

/**
 * Advanced search for GitHub users.
 * @param {Object} params - Search parameters
 * @param {string} params.username - GitHub username (partial or full)
 * @param {string} params.location - Location filter
 * @param {number} params.minRepos - Minimum repository count
 */
export const fetchAdvancedSearchResults = async ({
  username,
  location,
  minRepos,
}) => {
  try {
    // Build query dynamically
    let query = "";
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    // Use correct Search Users API endpoint
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

    return response.data; // { total_count, items: [...] }
  } catch (error) {
    console.error("Error searching GitHub users:", error);
    throw error;
  }
};

/**
 * Get detailed info for a specific user.
 * @param {string} username - GitHub username
 */
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
