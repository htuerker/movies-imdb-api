const baseUrl = "https://api.themoviedb.org/3";

export const fetchTopRatedMovies = (limit = 5) =>
  fetch(
    `${baseUrl}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((data) => data.results);

export default {
  fetchTopRatedMovies,
};
