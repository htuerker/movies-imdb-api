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

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setState({ status: "pending" });
    fetchMovieSearch(searchText)
      .then((resp) => resp.json())
      .then((searchData) =>
        setState({ status: "resolved", movies: searchData.results.slice(0, 5) })
      )
      .catch((err) => setState({ status: "rejected", error: err }));
  }, [searchText]);

  if (status === "idle") {
    return <div className="p-2 text-gray-500">Type something to search!</div>;
  }

  if (status === "pending") {
    return <div className="p-2 text-gray-500">Loading search results!</div>;
  }

  if (status === "resolved") {
    return (
      <div>
        {movies.length > 0 ? (
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
          <div className="p-2 text-gray-500">No result</div>
        )}
      </div>
    );
  }

  if (status === "rejected") {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="text-white">
      {state.status} {searchText}
    </div>
  );
}

export default MovieSearchContainer;
