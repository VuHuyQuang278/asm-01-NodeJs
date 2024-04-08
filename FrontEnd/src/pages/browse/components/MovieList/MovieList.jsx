// Nhập thư viện react
import React, { useState, useCallback } from "react";

// Nhập module css
import classes from "./MovieList.module.css";

// Nhập các component
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";

const MovieList = (props) => {
  // Khởi tạo state ban đầu
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [shownMovie, setShownMovie] = useState();

  // Xử lý sự kiện click vào ảnh
  const onClickHandler = useCallback(
    (event) => {
      // Lấy thông tin bộ phim
      const index = event.target.getAttribute("index");
      const movieData = props.movies[index];

      // Nếu chưa có bộ phim nào hiển thị thông tin chi tiết thì hiển thị bộ phim đó
      if (!shownMovie) {
        setShowMovieDetail(true);
        setShownMovie(movieData);
      } else {
        // Nếu kick vào cùng 1 bộ phim thì sẽ đóng phần hiển thị
        if (shownMovie === movieData) {
          setShowMovieDetail(false);
          setShownMovie(null);
        }
        // Không thì sẽ hiển thi thông tin bộ phim khác
        else if (shownMovie !== movieData) {
          setShowMovieDetail(true);
          setShownMovie(movieData);
        }
      }
    },
    [props.movies, shownMovie]
  );

  return (
    <div className={classes["movies-container"]}>
      {/* Nếu thể loại là Original thì không hiện nếu khác thì sẽ hiện tên thể loại */}
      <div className={classes.category}>
        {props.category === "Original" ? "" : props.category}
      </div>
      <div className={classes["list-movies"]}>
        {/* Hiển thị danh sách movie */}
        {props.movies.map((movie, index) => (
          <Movie
            key={movie.id}
            category={props.category}
            movie={movie}
            onClick={onClickHandler}
            index={index}
          />
        ))}
      </div>
      {/* Kiểm tra điều kiện để hiển thị thông tin chi tiết */}
      <div>{showMovieDetail && <MovieDetail movie={shownMovie} />}</div>
    </div>
  );
};

export default MovieList;
