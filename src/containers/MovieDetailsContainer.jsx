/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

function MovieDetailsContainer({ movieId }) {
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

export default MovieDetailsContainer;
