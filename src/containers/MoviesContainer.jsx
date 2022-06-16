/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockMovies } from "../mock";

export function MoviePosterCard({ movie }) {
  return (
    <div className="group overflow-hidden relative sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="something"
        />
        <div className="absolute inset-0 invisible group-hover:visible bg-gray-500 opacity-40" />
        <div className="flex absolute bottom-0 invisible group-hover:visible z-10 flex-col justify-end items-center w-full text-orange-300 bg-gray-700">
          <div className="py-3 font-mono font-bold text-center">
            {movie.title}
          </div>
        </div>
      </Link>
    </div>
  );
}

function MoviesContainer() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      // const movies = await fetchTopRatedMovies();
      // setTopRatedMovies(movies);
      setMovies(mockMovies);
    };
    fetchMovies();
  });
  return (
    <div className="flex flex-row flex-wrap w-full">
      {movies.map((movie) => (
        <MoviePosterCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesContainer;
