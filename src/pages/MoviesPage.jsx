/* eslint-disable react/prop-types */
import React, { Children, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MovieDetailsContainer from "../containers/MovieDetailsContainer";
import MoviesContainer from "../containers/MoviesContainer";
import MovieSearchContainer from "../containers/MovieSearchContainer";

const FILTERS = [
  { tag: "popular", text: "Popular", color: "rgb(244, 97, 65)" },
  { tag: "top-rated", text: "Top Rated", color: "rgb(125, 94, 242)" },
  { tag: "genre-action", text: "Action", color: "rgb(67, 199, 221)" },
  { tag: "genre-sci-fi", text: "Sci-Fi", color: "rgb(111, 136, 107)" },
];

function Sidebar({
  activeFilter,
  handleFilterChange,
  handleSearchChange,
  handleSearchClick,
  children,
}) {
  const isCurrentFilter = (filter) => filter.tag === activeFilter;
  return (
    <div className="basis-full mb-5 md:basis-2/5 md:px-3">
      <input
        onChange={handleSearchChange}
        className="block p-2 w-full outline-none"
        placeholder="Search..."
      />
      <div className="mb-3 bg-white">{children}</div>
      <button
        onClick={handleSearchClick}
        type="button"
        className="block p-2 mb-3 w-full text-white bg-purple-500 rounded"
        placeholder="Search..."
      >
        Search
      </button>
      <ul className="flex flex-wrap gap-3 h-auto">
        {FILTERS.map((filter) => (
          <li
            style={{
              backgroundColor: isCurrentFilter(filter) ? filter.color : "",
              border: `1px solid ${filter.color}`,
            }}
            className="inline-block m-0 font-bold text-white rounded"
          >
            <button
              onClick={handleFilterChange}
              value={filter.tag}
              type="button"
              className="py-1 px-2 m-0 hover:underline"
            >
              {filter.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MoviesPage() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const activeFilter = searchParams.get("filter") || "top-rated";

  const handleFilterChange = (event) => {
    event.preventDefault();
    setSearchParams({ filter: event.target.value });
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchClicked(true);
  };

  if (movieId === undefined) {
    return (
      <div className="flex flex-col items-center my-5 md:flex-row md:items-start lg:container">
        <Sidebar
          activeFilter={activeFilter}
          handleFilterChange={handleFilterChange}
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
        >
          {searchClicked && <MovieSearchContainer searchText={searchInput} />}
        </Sidebar>
        <div className="basis-3/4">
          <MoviesContainer filter={activeFilter} />
        </div>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="p-3 text-center text-white"
      >
        Go Back
      </button>
      <div className="container flex mt-5">
        <MovieDetailsContainer movieId={movieId} />
      </div>
    </>
  );
}

export default MoviesPage;
