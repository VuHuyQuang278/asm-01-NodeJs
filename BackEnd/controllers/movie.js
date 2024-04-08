const Movie = require("../models/movie");
const Genre = require("../models/genre");
const updateData = require("../utils/paging");

// Hàm lấy các phim đang trending
exports.getTrendingMovies = (req, res, next) => {
  // Lấy thứ tự của trang, nếu không có thì pageCurrent = 1
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  Movie.fetchAll((movies) => {
    // Sắp xếp movie theo trường popularity giảm dần
    movies.sort((a, b) => b.popularity - a.popularity);

    // Lấy danh sách cách phim thoả mãn và tổng số page dữ liệu có thể lấy
    const { moviesModified, total_page } = updateData(movies, pageCurrent);

    // Trả về dữ liệu
    res.json({
      results: moviesModified,
      page: pageCurrent,
      total_page: total_page,
    });
    // Trả về status code của respone
    res.status(200);
  });
};

exports.getTopRateMovies = (req, res, next) => {
  // Lấy thứ tự của trang, nếu không có thì pageCurrent = 1
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  Movie.fetchAll((movies) => {
    // Sắp xếp movie theo trường vote_average giảm dần
    movies.sort((a, b) => b.vote_average - a.vote_average);

    // Lấy danh sách cách phim thoả mãn và tổng số page dữ liệu có thể lấy
    const { moviesModified, total_page } = updateData(movies, pageCurrent);

    // Trả về dữ liệu
    res.json({
      results: moviesModified,
      page: pageCurrent,
      total_page: total_page,
    });
    // Trả về status code của respone
    res.status(200);
  });
};

exports.getMoviesByGenre = (req, res, next) => {
  // Lấy thứ tự của trang, nếu không có thì pageCurrent = 1
  let pageCurrent = req.query.page;
  if (!req.query.page) {
    pageCurrent = 1;
  }

  // Lấy id thể loại phim
  let genre = req.query.genre;
  // Nếu không có id thì trả về lỗi
  if (!req.query.genre) {
    // Trả về status code của respone
    res.status(400).send({
      message: "Not found gerne parram",
    });
  }

  Genre.fetchAll((genres) => {
    // Tìm thông tin thể loại phim
    const genreMovie = genres.filter((movie) => movie.id === genre);

    // Nếu không có thể loại nào thoả mãn thì trả về lỗi
    if (genreMovie.length < 1) {
      // Trả về status code của respone
      res.status(400).send({
        message: "Not found that gerne id",
      });
    }

    Movie.fetchAll((movies) => {
      // Lấy danh sách phim thoả mãn id thể loại yêu cầu
      const movieList = movies.filter((movie) => {
        for (let i = 0; i < movie.genre_ids.length; i++) {
          if (movie.genre_ids[i] === genre) {
            return true;
          }
        }
      });

      // Lấy danh sách cách phim thoả mãn và tổng số page dữ liệu có thể lấy
      const { moviesModified, total_page } = updateData(movieList, pageCurrent);

      // Trả về dữ liệu
      res.json({
        results: moviesModified,
        page: pageCurrent,
        total_page: total_page,
        genre_name: genreMovie.name,
      });
      // Trả về status code của respone
      res.status(200);
    });
  });
};
