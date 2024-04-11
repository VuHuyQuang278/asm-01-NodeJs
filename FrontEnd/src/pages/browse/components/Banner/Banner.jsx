// Nhập thư viện react
import React, { useState, useEffect, useCallback, Fragment } from "react";

// Nhập hàm fetchApi và object requests
import { requests } from "../../../../api/request";

// Nhập module css
import classes from "./Banner.module.css";

const Banner = (props) => {
  // Thiết lập state
  const [movie, setMovie] = useState(null);

  // Sử dụng useCallback để hàm không phải chạy lại mỗi khi component được tạo lại
  const fetchData = useCallback(async () => {
    try {
      // Lấy danh sách các bộ phim
      const response = await fetch(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      // Lấy ngẫu nhiên 1 bộ phim
      const movieInfor = await data.results[
        Math.floor(Math.random() * data.results.length - 1)
      ];
      setMovie(movieInfor);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // Dùng useEffect để chạy hàm
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let content = "";

  // Hiển thị Banner khi có thông tin về bộ phim
  if (movie !== null) {
    content = (
      <div className={classes["banner-container"]}>
        <div className={classes["bg-img-container"]}>
          <img
            className={classes["bg-img"]}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="backdrop-img"
          />
        </div>
        <div className={classes["banner-content"]}>
          <div className={classes.title}>{movie.name}</div>
          <div className={classes["btn-container"]}>
            <button className={classes.btn}>Play</button>
            <button className={classes.btn}>My List</button>
          </div>
          <div className={classes.overview}>{movie.overview}</div>
        </div>
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Banner;
