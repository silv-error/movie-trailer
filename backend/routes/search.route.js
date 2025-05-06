import express from "express";
import { 
  deleteSearchHistory, 
  getSearchHistory, 
  searchMovie, 
  searchPerson, 
  searchTv 
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person", searchPerson);
router.get("/movie", searchMovie);
router.get("/tv",  searchTv);

router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteSearchHistory);

export default router;