// Nhập thư viện react
import React from "react";

// Nhập module css
import classes from "./Movie.module.css";

const Movie = (props) => {
  let imgClass;
  let imgSrc;
  let imgAlt;

  // Nếu thể loại là Original thì hiển thị poster
  if (props.category === "Original") {
    imgClass = classes["img-poster"];
    imgSrc = `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
    imgAlt = "Poster of movie";
  }
  // Nếu không thì hiển thị backdrop
  else {
    imgClass = classes["img-backdrop"];
    imgSrc = `https://image.tmdb.org/t/p/original${
      props.movie.backdrop_path
        ? props.movie.backdrop_path
        : props.movie.poster_path
    }`;
    imgAlt = "Backdrop of movie";
  }

  return (
    <img
      className={imgClass}
      src={imgSrc}
      alt={imgAlt}
      onClick={props.onClick}
      index={props.index}
    />
  );
};

export default Movie;
