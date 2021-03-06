const baseUrl = "https://api.themoviedb.org/3";

export const fetchTopRatedMovies = () =>
  fetch(
    `${baseUrl}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((data) => data.results);

export const fetchPopularMovies = () =>
  fetch(
    `${baseUrl}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((data) => data.results);
export default {
  fetchTopRatedMovies,
};

export const fetchMovieSearch = (searchText) =>
  fetch(
    `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchText}`
  );
