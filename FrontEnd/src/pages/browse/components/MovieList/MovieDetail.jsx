// Nhập thư viện react
import React, { useState, useEffect, useCallback } from "react";

// Nhập module css
import classes from "./MovieDetail.module.css";

// Nhập API_Key
import { API_KEY } from "../../../../api/request";

// Nhập component YouTube
import YouTube from "react-youtube";

const MovieDetail = (props) => {
  // Khởi tạo state
  const [trailer, setTrailer] = useState();

  // Hàm nạp dữ liệu trailer
  const fetchTrailer = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=${API_KEY}`
    );
    const results = await response.json();
    const data = await results.results;

    let dataMedia;
    // Nếu không nạp được dữ liệu (data = undefined)
    if (data === undefined) {
      dataMedia = {
        type: "bg",
        key: `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`,
      };
      setTrailer(dataMedia);
    } else {
      // Nếu có dữ liệu trả về
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].site === "YouTube") {
            // Ưu tiên lấy video về trailer hơn teaser
            if (data[i].type === "Trailer") {
              dataMedia = {
                type: "video",
                key: data[i].key,
              };
              break;
            } else if (data[i].type === "Teaser") {
              if (!dataMedia) {
                dataMedia = {
                  type: "video",
                  key: data[i].key,
                };
              }
            }
          }
        }

        setTrailer(dataMedia);
      }
      // Nếu không có dữ liệu trả về (data = [])
      else {
        dataMedia = {
          type: "bg",
          key: `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`,
        };
        setTrailer(dataMedia);
      }
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
          Release Date: {props.movie.release_date}
        </h5>
        <h5 className={classes.vote}>Vote: {props.movie.vote_average}/10</h5>
        <p>{props.movie.overview}</p>
      </div>
      <div className={classes.trailer}>
        {trailer &&
          (trailer.type === "video" ? (
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
          ) : (
            <div>
              <img
                src={trailer.key}
                alt="background movie"
                className={classes["bg-img"]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieDetail;
