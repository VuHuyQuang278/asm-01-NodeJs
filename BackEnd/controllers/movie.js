const Movie = require("../models/movie");
const Genre = require("../models/genre");
const updateData = require("../utils/paging");

exports.getTrendingMovies = (req, res, next) => {
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.popularity - a.popularity);

    const { moviesModified, total_page } = updateData(movies, pageCurrent);

    res.json({
      results: moviesModified,
      page: pageCurrent,
      total_page: total_page,
    });
    res.status(200);
  });
};

exports.getTopRateMovies = (req, res, next) => {
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.vote_average - a.vote_average);

    const { moviesModified, total_page } = updateData(movies, pageCurrent);

    res.json({
      results: moviesModified,
      page: pageCurrent,
      total_page: total_page,
    });
    res.status(200);
  });
};

exports.getMoviesByGenre = (req, res, next) => {
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  let genre = req.query.genre;
};
