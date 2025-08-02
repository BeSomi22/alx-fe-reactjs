import axios from "axios";

const API_URL = "https://api.github.com/users/";

export const fetchUserData = async ({ username, location, minRepos }) => {
  try {
    //Build query string dynamically
    let query = "";
    if (username) query += `${username} in:login`;
    if (location) query += `location:${location}`;
    if (miniRepos) query += `repos:>=${minRepos}`;

    const response = await axios.get(
      `${API_URL}?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `token ${
            import.meta.env.VITE_APP_GITHUB_API_KEY || ""
          }`,
        },
      }
    );
    return response.data; //This contains "items" (list of users)
  } catch (error) {
    console.error("Error searching GitHub user:", error);
    throw error;
  }
};
