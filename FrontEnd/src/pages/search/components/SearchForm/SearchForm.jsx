// Nhập thư viện react
import React, { useState, useCallback } from "react";

// Nhập module css
import classes from "./SearchForm.module.css";

// Nhập object requests
import { requests } from "../../../../api/request";

const SearchForm = (props) => {
  // Khởi tạo state
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [enteredGenre, setEnteredGenre] = useState("genre");
  const [enteredMediaType, setEnteredMediaType] = useState("mediaType");
  const [enteredLanguage, setEnteredLanguage] = useState("language");
  const [enteredYear, setEnteredYear] = useState("year");
  // Hàm tìm kiếm phim
  const fetchMovie = useCallback(
    async (movieName, genre, mediaType, language, year) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies${requests.fetchSearch}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keyword: movieName,
              genre,
              mediaType,
              language,
              year,
            }),
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
    []
  );

  // Hàm kiểm tra dữ liệu
  const validateValue = (value) => value.trim() !== "";

  // Kiểm tra form có bị lỗi không
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // Đặt từ khoá để tìm kiếm
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // Hàm set state khi người dùng chọn vào trường input
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // Hàm reset input
  const resetInputHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
    setEnteredGenre("genre");
    setEnteredMediaType("mediaType");
    setEnteredLanguage("language");
    setEnteredYear("year");
  };

  const genreChangeHandle = (event) => {
    setEnteredGenre(event.target.value);
  };

  const mediaTypeChangeHandle = (event) => {
    setEnteredMediaType(event.target.value);
  };

  const languageChangeHandle = (event) => {
    setEnteredLanguage(event.target.value);
  };

  const yearChangeHandle = (event) => {
    setEnteredYear(event.target.value);
  };

  // Hàm xử lý form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // Khi dữ liệu không hợp lệ thị dừng việc thực hiện hàm
    if (!valueIsValid) {
      return;
    }

    // Lấy dữ liệu tìm kiếm
    const data = await fetchMovie(
      enteredValue,
      enteredGenre,
      enteredMediaType,
      enteredLanguage,
      enteredYear
    );

    // console.log(data);

    // Truyền dữ liệu lên component cha
    props.movies(data);

    // Reset input
    // resetInputHandler();
  };

  const years = [];
  const startYear = 1922; // Năm bắt đầu
  const endYear = new Date().getFullYear(); // Năm hiện tại
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={classes.search}>
        <input
          type="text"
          className={classes.input}
          value={enteredValue}
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
        />
        <button className={classes["search-icon-btn"]} type="submit">
          <svg
            className={`svg-inline--fa fa-search fa-w-16 ${classes["search-icon"]}`}
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </button>
      </div>
      {hasError && (
        <p className={classes.error}>Tên phim không được để trống !</p>
      )}
      <div className={classes["advanced-search"]}>
        <div>
          <select
            value={enteredGenre}
            onChange={genreChangeHandle}
            className={classes.select}
          >
            <option value="genre">Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </div>
        <div>
          <select
            value={enteredMediaType}
            onChange={mediaTypeChangeHandle}
            className={classes.select}
          >
            <option value="mediaType">Media Type</option>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            <option value="person">Person</option>
          </select>
        </div>
        <div>
          <select
            value={enteredLanguage}
            onChange={languageChangeHandle}
            className={classes.select}
          >
            <option value="language">Language</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
        <div>
          <select
            value={enteredYear}
            onChange={yearChangeHandle}
            className={classes.select}
          >
            <option value="year">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className={classes["break-line"]} />
      <div className={classes["btn-container"]}>
        <button
          className={`${classes.btn} ${classes["btn-reset"]}`}
          onClick={resetInputHandler}
        >
          RESET
        </button>
        <button
          className={`${classes.btn} ${classes["btn-search"]} `}
          type="submit"
          disabled={!valueIsValid}
        >
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
