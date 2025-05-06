import { fetchTMDB } from "../services/tmdb.service.js";

export const getAllTrending = async (req, res) => {
  try {
    const response = await fetchTMDB("https://api.themoviedb.org/3/trending/all/day?language=en-US");
    res.json(response.results.slice(0, 10));
  } catch (error) {
    console.error(`Error in getAllTrending controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}