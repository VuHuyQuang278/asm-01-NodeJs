// Nhập thư viện react
import React, { useState, useCallback } from "react";

// Nhập module css
import classes from "./ResultList.module.css";

// Nhập các component
import MovieDetail from "../../../browse/components/MovieList/MovieDetail";

const ResultList = (props) => {
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
    <div className={classes["result-list"]}>
      <h3 className={classes.title}>Search Result</h3>

      <div className={classes["list-movie"]}>
        {props.movies &&
          props.movies.map((movie, index) => (
            <div className={classes["img-container"]} key={movie.id}>
              <img
                className={classes["img-movie"]}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="Backdrop of movie"
                onClick={onClickHandler}
                index={index}
              />

              {showMovieDetail &&
                shownMovie.id === movie.id &&
                index >= 0 &&
                index < 7 && (
                  <div className={classes["movie-detail-row-1"]}>
                    <MovieDetail movie={shownMovie} />
                  </div>
                )}
              {showMovieDetail &&
                shownMovie.id === movie.id &&
                index >= 7 &&
                index < 14 && (
                  <div className={classes["movie-detail-row-2"]}>
                    <MovieDetail movie={shownMovie} />
                  </div>
                )}
              {showMovieDetail && shownMovie.id === movie.id && index >= 14 && (
                <div className={classes["movie-detail-row-3"]}>
                  <MovieDetail movie={shownMovie} />
                </div>
              )}
            </div>
          ))}
      </div>
      {/* <div>{showMovieDetail && <MovieDetail movie={shownMovie} />}</div> */}
    </div>
  );
};

export default ResultList;
