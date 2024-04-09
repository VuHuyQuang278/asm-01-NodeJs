const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Video = require("../models/video");
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
    return res.status(400).send({
      message: "Not found gerne parram",
    });
  }

  Genre.fetchAll((genres) => {
    // Tìm thông tin thể loại phim
    const genreMovie = genres.filter((movie) => movie.id === genre);

    // Nếu không có thể loại nào thoả mãn thì trả về lỗi
    if (genreMovie.length < 1) {
      // Trả về status code của respone
      return res.status(400).send({
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

exports.getMovieTrailer = (req, res, next) => {
  // Lấy id của phim muốn tìm Trailer
  const film_id = req.body.film_id;

  // Nếu người dùng không nhập film id
  if (!req.body.film_id) {
    // Trả về status code của respone
    return res.status(400).send({
      message: "Not found film_id parram",
    });
  }

  Video.fetchAll((moviesInfor) => {
    // Tìm kiếm thông tin bộ phim
    const movieInfor = moviesInfor.filter((movie) => movie.id === film_id);
    // Lấy danh sách videos của bộ phim
    const movieTrailers = movieInfor.videos;

    // Sắp xếp các video theo trường published_at gần nhất
    movieTrailers.sort((a, b) => {
      const date1 = new Date(a.published_at);
      const date2 = new Date(b.published_at);

      const result = date2 - date1;
      return result;
    });

    for (let i = 0; i < movieTrailers.length; i++) {
      // Video phải là official
      if (movieTrailers[i].official) {
        // Nguồn video phải là từ YouTube
        if (movieTrailers[i].site === "YouTube") {
          // Ưu tiên lấy video về trailer hơn teaser
          if (movieTrailers[i].type === "Trailer") {
            // Trả về dữ liệu
            res.json(movieTrailers[i]);

            // Trả về status code của respone
            res.status(200);
            break;
          } else if (movieTrailers[i].type === "Teaser") {
            // Trả về dữ liệu
            res.json(movieTrailers[i]);

            // Trả về status code của respone
            res.status(200);
          }
        }
        // Nếu không tìm được video phù hợp
      } else {
        // Trả về status code của respone
        return res.status(404).send({
          message: "Not found video",
        });
      }
    }
  });
};
