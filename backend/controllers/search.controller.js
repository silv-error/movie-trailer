import User from "../models/user.model.js";
import { fetchTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  try {
    const user = req.user;
    const { term } = req.query;
    const response = await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${term}&language=en-US&page=1`)
    
    const historyExist = await User.findOne({ _id: user._id, searchHistory: {
      $elemMatch: { id: response.results[0].id }
    }});

    if(!historyExist) {
      await User.findByIdAndUpdate(req.user._id, { $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        }
      }});
    }
    
    res.status(200).json({content: response.results});
  } catch (error) {
    console.error(`Error in searchPerson controller ${error.message}`);
    res.status(500).json({error: "Internal server error"});
  }
}

export const searchMovie = async (req, res) => {
  try {
    const user = req.user;
    const { term } = req.query;
    const response = await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${term}&language=en-US&page=1`)
    
    const historyExist = await User.findOne({ _id: user._id, searchHistory: {
      $elemMatch: { id: response.results[0].id
    }}});
    
    if(!historyExist) {
      await User.findByIdAndUpdate(req.user._id, { $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        }
      }});
    }
    res.status(200).json({content: response.results});
  } catch (error) {
    console.error(`Error in searchMovie controller ${error.message}`);
    res.status(500).json({error: "Internal server error"});
  }
}

export const searchTv = async (req, res) => {
  try {
    const user = req.user;
    const { term } = req.query;
    const response = await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${term}&language=en-US&page=1`)
    
    const historyExist = await User.findOne({ _id: user._id, searchHistory: {
      $elemMatch: { id: response.results[0].id }
    }});

    if(!historyExist) {
      await User.findByIdAndUpdate(req.user._id, { $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        }
      }});
    }
    
    res.status(200).json({content: response.results});
  } catch (error) {
    console.error(`Error in searchTv controller ${error.message}`);
    res.status(500).json({error: "Internal server error"});
  }
}

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({content: req.user.searchHistory});
  } catch (error) {
    console.error(`Error in getSearchHistory controller ${error.message}`);
    res.status(500).json({error: "Internal server error"});
  }
}

export const deleteSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user._id, { 
      $pull: { 
        searchHistory: { id: parseInt(id) } // the id stored in User document was an integer
      } 
    });
    res.status(200).json({message: "Search history deleted successfully"});
  } catch (error) {
    console.error(`Error in deleteSearchHistory controller ${error.message}`);
    res.status(500).json({error: "Internal server error"});
  }
}