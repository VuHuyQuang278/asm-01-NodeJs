// Nhập thư viện react
import React, { useState, useCallback, useEffect } from "react";

// Nhập các component
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import MovieList from "./components/MovieList/MovieList";

// Nhập hàm fetchApi và object requests
import { fetchApi, requests } from "../../api/request";

// Nhập module css
import classes from "./Browse.module.css";

function Browse() {
  // Thiết lập trạng thái ban đầu
  const [original, setOriginal] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRate, setTopRate] = useState([]);
  const [action, SetAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);

  // Nạp dữ liệu các thể loại movie
  const fetchOriginal = useCallback(async () => {
    try {
      // Lấy danh sách các bộ phim
      const response = await fetch(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const originalFimls = await data.results;
      setOriginal(originalFimls);
      console.log("original", originalFimls);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const fetchTrending = useCallback(async () => {
    const data = await fetchApi(requests.fetchTrending);
    const trendingFimls = await data.results;
    setTrending(trendingFimls);
    console.log("trending", trendingFimls);
  }, []);

  const fetchTopRated = useCallback(async () => {
    const data = await fetchApi(requests.fetchTopRated);
    const topRateFimls = await data.results;
    setTopRate(topRateFimls);
    console.log("toprate", topRateFimls);
  }, []);

  const fetchAction = useCallback(async () => {
    const data = await fetchApi(requests.fetchActionMovies);
    const actionFimls = await data.results;
    SetAction(actionFimls);
    console.log("action", actionFimls);
  }, []);

  const fetchComedy = useCallback(async () => {
    const data = await fetchApi(requests.fetchComedyMovies);
    const comedyFimls = await data.results;
    setComedy(comedyFimls);
    console.log("comedy", comedyFimls);
  }, []);

  const fetchHorror = useCallback(async () => {
    const data = await fetchApi(requests.fetchHorrorMovies);
    const horrorFimls = await data.results;
    setHorror(horrorFimls);
    console.log("horror", horrorFimls);
  }, []);

  const fetchRomance = useCallback(async () => {
    const data = await fetchApi(requests.fetchRomanceMovies);
    const romanceFimls = await data.results;
    setRomance(romanceFimls);
    console.log("romace", romanceFimls);
  }, []);

  const fetchDocumentariesFimls = useCallback(async () => {
    const data = await fetchApi(requests.fetchDocumentaries);
    const documentariesFimls = await data.results;
    setDocumentaries(documentariesFimls);
    console.log("document", documentariesFimls);
  }, []);

  // Chạy hàm và chạy lại khi có sự thay đổi
  useEffect(() => {
    fetchOriginal();
    fetchTrending();
    fetchTopRated();
    fetchAction();
    fetchComedy();
    fetchHorror();
    fetchRomance();
    fetchDocumentariesFimls();
  }, [
    fetchOriginal,
    fetchTrending,
    fetchTopRated,
    fetchAction,
    fetchComedy,
    fetchHorror,
    fetchRomance,
    fetchDocumentariesFimls,
  ]);
  return (
    <div className={classes.browse}>
      <div className={classes.header}>
        <NavBar />
        <Banner />
      </div>
      <div className={classes["movie-list"]}>
        <MovieList category="Original" movies={original} />
        <MovieList category="Xu hướng" movies={trending} />
        <MovieList category="Xếp hạng cao" movies={topRate} />
        <MovieList category="Hành động" movies={action} />
        <MovieList category="Hài" movies={comedy} />
        <MovieList category="Kinh dị" movies={horror} />
        <MovieList category="Lãng mạn" movies={romance} />
        <MovieList category="Tài liệu" movies={documentaries} />
      </div>
    </div>
  );
}

export default Browse;
