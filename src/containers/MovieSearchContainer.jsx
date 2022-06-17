/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { fetchMovieSearch } from "../api";

function MovieSearchContainer({ searchText }) {
  const [state, setState] = useState({
    status: "idle",
    movies: [],
    error: null,
  });

  const { status, movies, error } = state;

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setState("pending");
    fetchMovieSearch(searchText)
      .then((resp) => resp.json())
      .then((searchData) =>
        setState({ status: "resolved", movies: searchData.results.slice(0, 5) })
      )
      .catch((err) => setState({ status: "rejected", error: err }));
  }, [searchText]);

  if (status === "resolved") {
    return (
      <div>
        {movies.length > 0 && "hello" ? (
          <ul>
            {movies.map((movie) => (
              <li className="pl-1 my-1 hover:bg-gray-100">
                <Link to={`/movies/${movie.id}`}>
                  <div className="flex justify-between h-20">
                    <div className="flex flex-col justify-center items-start">
                      <div>{movie.title}</div>
                      <div className="flex gap-1 justify-start items-center">
                        <span className="text-yellow-400">
                          <FaStar />
                        </span>
                        {movie.vote_average}
                      </div>
                      <div>{movie.first_air_date}</div>
                    </div>
                    <img
                      className="object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-white">No result</div>
        )}
      </div>
    );
  }

  return (
    <div className="text-white">
      {state.status} {searchText}
    </div>
  );
}

export default MovieSearchContainer;
