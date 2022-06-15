/* eslint-disable react/prop-types */
import "./App.css";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { fetchTopRatedMovies } from "./api";
// import { mockMovies } from "./mock";

console.log(process.env);

export function MovieDetails() {
  const { movieId } = useParams();
  const [state, setState] = useState({
    status: "idle",
    movie: null,
    error: null,
  });

  const { status, movie } = state;

  useEffect(() => {
    if (!movieId) {
      return;
    }
    setState({ status: "pending" });
    (() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((movieData) => setState({ status: "resolved", movie: movieData }))
        .catch((err) => setState({ status: "rejected", error: err }));
    })();
  }, []);

  if (status === "idle") {
    return "Hello, World!";
  }
  if (status === "pending") {
    return <div className="mx-auto text-8xl">Loading...</div>;
  }
  if (status === "rejected") {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="container mx-auto mt-8">
      <div className="flex relative w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
        <h1 className="basis-2/3 text-4xl">{movie.title}</h1>
        <div className="basis-1/3">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="something"
          />
        </div>
      </div>
    </div>
  );
}

export function MoviePosterCard({ movie }) {
  return (
    <div className="group relative w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <Link to={`/movies/${movie.id}`}>
        <button type="button">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="something"
          />
        </button>
        {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
        <div className="flex absolute inset-0 invisible group-hover:visible z-10 flex-col justify-end items-center pb-3 w-full h-full bg-gray-600 bg-opacity-80">
          <div className="text-lg underline">{movie.title}</div>
          <div className="text-xs">{movie.overview}</div>
          <div className="flex absolute top-0 justify-center items-center py-1 px-3 m-3 text-2xl text-yellow-300">
            <span className="mr-3">
              <FaStar display="inline" />
            </span>
            <span>{movie.vote_average}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function App() {
  // const [searchInput, setSearchInput] = useState("");
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const hello = async () => {
      const movies = await fetchTopRatedMovies();
      setTopRatedMovies(movies);
    };
    hello();
  }, []);

  // const handleSearchChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  // const handleSearchClick = (event) => {
  //   event.preventDefault();

  //   fetchTopRatedMovies();
  // };

  return (
    <div className="App">
      <header className="App-header">
        <div className="mx-auto md:container lg:container">
          {/* <input
            className="p-1 m-3 w-full text-black"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="button" onClick={handleSearchClick}>
            Search
          </button> */}
          <div className="flex flex-row flex-wrap w-full">
            {topRatedMovies.map((movie) => (
              <MoviePosterCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
