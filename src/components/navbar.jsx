import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-500 mb-3">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex justify-between w-auto px-4">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white"
            to="/"
          >
            Sticky Notes
          </Link>
        </div>
        <div className="flex justify-between w-auto px-4 ">
          <ul className="flex flex-row list-none ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75"
                to="/"
              >
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/add"
              >
                <FaPlusCircle className="text-lg" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;