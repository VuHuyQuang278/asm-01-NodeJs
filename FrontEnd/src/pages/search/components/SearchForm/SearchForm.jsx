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

  // Hàm tìm kiếm phim
  const fetchMovie = useCallback(async (movieName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3${requests.fetchSearch}&query=${movieName}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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
  };

  // Hàm xử lý form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // Khi dữ liệu không hợp lệ thị dừng việc thực hiện hàm
    if (!valueIsValid) {
      return;
    }

    // Lấy dữ liệu tìm kiếm
    const data = await fetchMovie(enteredValue);

    console.log(data);

    // Truyền dữ liệu lên component cha
    props.movies(data);

    // Reset input
    // resetInputHandler();
  };

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
