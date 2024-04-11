export const API_KEY = "9855c5d8697586d195634224cf87eb23";
export const token = "8qlOkxz4wq";
export const userId = "User 01";

export const requests = {
  fetchTrending: `/trending?token=${token}&userId=${userId}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/top-rate/?token=${token}&userId=${userId}`,
  fetchActionMovies: `/discover?token=${token}&userId=${userId}&genre=28`,
  fetchComedyMovies: `/discover?token=${token}&userId=${userId}&genre=35`,
  fetchHorrorMovies: `/discover?token=${token}&userId=${userId}&genre=27`,
  fetchRomanceMovies: `/discover?token=${token}&userId=${userId}&genre=10749`,
  fetchDocumentaries: `/discover?token=${token}&userId=${userId}&genre=99`,
  fetchSearch: `/search?token=${token}&userId=${userId}`,
};

// Hàm nạp dữ liệu
export const fetchApi = async (url) => {
  try {
    const response = await fetch(`http://localhost:5000/api/movies${url}`);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
