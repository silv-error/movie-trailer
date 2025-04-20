import { fetchTMDB } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({content: randomMovie});
  } catch (error) {
    console.error(`Error in getTrendingTv controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getTvTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    res.json({trailers: data.results});
  } catch (error) {
    console.error(`Error in getTvTrailer controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    res.json({content: data});
  } catch (error) {
    console.error(`Error in getTvDetails controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getSimilarTv = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    res.json({similar: data});
  } catch (error) {
    console.error(`Error in getSimilarTv controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getTvByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(req.params);
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    res.json({category: data})
  } catch (error) {
    console.error(`Error in getTvByCategory controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}