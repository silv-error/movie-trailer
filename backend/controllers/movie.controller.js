import { fetchTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({content: randomMovie});
  } catch (error) {
    console.error(`Error in getTrendingMovie controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getMovieTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({trailers: data.results});
  } catch (error) {
    console.error(`Error in getMovieTrailer controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    res.json({content: data});
  } catch (error) {
    console.error(`Error in getMovieDetails controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.json({similar: data});
  } catch (error) {
    console.error(`Error in getSimilarMovies controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(req.params);
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    res.json({category: data})
  } catch (error) {
    console.error(`Error in getMoviesByCategory controller ${error.message}`);
    res.status(500).json({ error: "Internal server error"});
  }
}