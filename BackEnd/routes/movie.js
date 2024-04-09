const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/trending", movieController.getTrendingMovies);

router.get("/top-rate", movieController.getTopRateMovies);

router.post("/video", movieController.getMovieTrailer);

router.post("/search", movieController.Searchmovies);

module.exports = router;
