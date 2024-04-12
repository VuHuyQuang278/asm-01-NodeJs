// Nhập thư viện react
import React, { useState, useEffect, useCallback } from "react";

// Nhập module css
import classes from "./MovieDetail.module.css";

// Nhập API_Key
import { token, userId } from "../../../../api/request";

// Nhập component YouTube
import YouTube from "react-youtube";

const MovieDetail = (props) => {
  // Khởi tạo state
  const [trailer, setTrailer] = useState();

  // Hàm nạp dữ liệu trailer
  const fetchTrailer = useCallback(async () => {
    const response = await fetch(
      `http://localhost:5000/api/movies/video?token=${token}&userId=${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ film_id: props.movie.id }),
        mode: "cors",
      }
    );
    const results = await response.json();
    console.log(results);
    setTrailer(results);

    let dataMedia;
    // Nếu không nạp được dữ liệu (data = undefined)
    if (results === undefined) {
      dataMedia = {
        type: "bg",
        key: `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`,
      };
      setTrailer(dataMedia);
      console.log(dataMedia);
    }
  }, [props.movie]);

  useEffect(() => {
    fetchTrailer();
  }, [fetchTrailer]);

  return (
    <div className={classes["movie-detail-container"]}>
      <div className={classes["movie-infor"]}>
        <h3 className={classes.title}>
          {props.movie.name ? props.movie.name : props.movie.title}
        </h3>
        <hr />
        <h5 className={classes["release-date"]}>
          Release Date:{" "}
          {props.movie.release_date
            ? props.movie.release_date
            : props.movie.first_air_date}
        </h5>
        <h5 className={classes.vote}>Vote: {props.movie.vote_average}/10</h5>
        <p>{props.movie.overview}</p>
      </div>
      <div className={classes.trailer}>
        {trailer && (
          <YouTube
            className={classes.video}
            videoId={trailer.key}
            opts={{
              height: "400",
              width: "100%",
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
