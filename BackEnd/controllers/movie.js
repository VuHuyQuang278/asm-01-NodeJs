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

// Lấy các phim có Rating cao
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

// Lấy các phim theo thể loại
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
    const genreMovie = genres.filter((movie) => movie.id.toString() === genre);

    // Nếu không có thể loại nào thoả mãn thì trả về lỗi
    if (genreMovie.length === 0) {
      // Trả về status code của respone
      return res.status(400).send({
        message: "Not found that gerne id",
      });
    }

    Movie.fetchAll((movies) => {
      // Lấy danh sách phim thoả mãn id thể loại yêu cầu
      const movieList = movies.filter((movie) =>
        movie.genre_ids.includes(genreMovie[0].id)
      );

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

// Lấy trailer của một bộ phim
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

    if (movieInfor.length === 0) {
      return res.status(404).send({
        message: "Not found video",
      });
    }

    // Lấy danh sách videos của bộ phim
    const movieTrailers = movieInfor[0].videos;

    // Sắp xếp các video theo trường published_at gần nhất
    movieTrailers.sort((a, b) => {
      const date1 = new Date(a.published_at);
      const date2 = new Date(b.published_at);

      const result = date2 - date1;
      return result;
    });

    for (let i = 0; i < movieTrailers.length; i++) {
      // Lọc video theo tiêu chí
      if (movieTrailers[i].official && movieTrailers[i].site === "YouTube") {
        // Ưu tiên lấy video về trailer hơn teaser
        if (movieTrailers[i].type === "Trailer") {
          // Trả về dữ liệu
          return res.status(200).json(movieTrailers[i]);
        }
      }
    }

    for (let i = 0; i < movieTrailers.length; i++) {
      // Lọc video theo tiêu chí
      if (movieTrailers[i].official && movieTrailers[i].site === "YouTube") {
        // Ưu tiên lấy video về trailer hơn teaser
        if (movieTrailers[i].type === "Teaser") {
          // Trả về dữ liệu
          return res.status(200).json(movieTrailers[i]);
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

// Tìm kiếm phim theo từ khóa
exports.Searchmovies = (req, res, next) => {
  const keyword = req.body.keyword.toLowerCase();

  const genre = req.body.genre;
  const mediaType = req.body.mediaType;
  const language = req.body.language;
  const year = req.body.year;

  // Nếu người dùng không có param
  if (!req.body.keyword) {
    // Trả về status code của respone
    return res.status(400).send({
      message: "Not found keyword parram",
    });
  }

  Movie.fetchAll((movies) => {
    // tìm kiếm overview hoặc title có chứa từ khóa, không phân biệt hoa thường
    let moviesResult = movies.filter((movie) => {
      // Nếu tên phim là trường title
      if (movie.title) {
        const lowerTitle = movie.title.toLowerCase();
        const lowerOverview = movie.overview.toLowerCase();

        return lowerTitle.includes(keyword) || lowerOverview.includes(keyword);
      }

      // Nếu tên phim là trường name
      if (movie.name) {
        const lowerTitle = movie.name.toLowerCase();
        const lowerOverview = movie.overview.toLowerCase();

        return lowerTitle.includes(keyword) || lowerOverview.includes(keyword);
      }
    });

    // Nếu có tham số genre
    if (genre !== "genre") {
      moviesResult = moviesResult.filter((movie) =>
        movie.genre_ids.includes(parseInt(genre))
      );
    }

    // Nếu có tham số mediaType
    if (mediaType !== "mediaType") {
      moviesResult = moviesResult.filter(
        (movie) => movie.media_type === mediaType
      );
    }

    // Nếu có tham số language
    if (language !== "language") {
      moviesResult = moviesResult.filter(
        (movie) => movie.original_language === language
      );
    }

    // Nếu có tham số year
    if (year !== "year") {
      moviesResult = moviesResult.filter((movie) => {
        // Nếu năm phát hành là trường release_date
        if (movie.release_date) {
          const time = new Date(movie.release_date);
          const yearTime = time.getFullYear().toString();

          return yearTime === year;
        }

        // Nếu năm phát hành là trường first_air_date
        if (movie.first_air_date) {
          const time = new Date(movie.first_air_date);
          const yearTime = time.getFullYear().toString();

          return yearTime === year;
        }
      });
    }

    // if (moviesResult.length === 0) {
    //   return res.status(404).send({
    //     message: "Not found movies",
    //   });
    // }

    // Lấy danh sách cách phim thoả mãn và tổng số page dữ liệu có thể lấy
    const { moviesModified, total_page } = updateData(moviesResult, 1);

    // Trả về dữ liệu
    res.json({
      results: moviesModified,
      page: 1,
      total_page: total_page,
    });
    // Trả về status code của respone
    res.status(200);
  });
};
