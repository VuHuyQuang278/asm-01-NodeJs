// Nhập thư viện react
import React, { useState } from "react";

// Nhập module css
import classes from "./Search.module.css";

// Nhập các component
import NavBar from "../browse/components/NavBar/NavBar";
import SearchForm from "./components/SearchForm/SearchForm";
import ResultList from "./components/ResutlList/ResultList";

const Search = () => {
  // Khởi tạo state
  const [results, setResutls] = useState([]);

  // Lấy danh sách phim từ component SearchForm
  const listMovie = (data) => {
    setResutls(data.results);
  };

  return (
    <div className="app">
      <div className={classes.header}>
        <NavBar />
      </div>
      <div className={classes.body}>
        <SearchForm movies={listMovie} />
        <ResultList movies={results} />
      </div>
    </div>
  );
};

export default Search;
