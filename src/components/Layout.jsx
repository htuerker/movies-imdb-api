import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex top-0 items-center p-3 w-full text-white">
      <div className="py-3 font-mono text-2xl font-bold">MOVIES</div>
      <ul className="flex gap-3 mx-auto">
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tv-shows">Tv Shows</NavLink>
        <NavLink to="/animations">Animations</NavLink>
      </ul>
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="relative mx-auto w-full md:container lg:container">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
