import express from "express";
import { 
  getTvDetails, 
  getTvsByCategory, 
  getTvTrailer, 
  getSimilarTvs, 
  getTrendingTv 
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailer);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);


export default router;