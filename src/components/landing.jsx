import React from "react";
import NotesImage from "../images/NotesImage.svg";
import LoginButton from "./login-button";
import SignupButton from "./signup-button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-around">
        <div>
          <img src={NotesImage} alt="notesImage" />
        </div>
        <div className="flex flex-col justify-center text-center text-blue-700">
          <div className="uppercase text-6xl font-extrabold">Never Forget</div>
          <div className="mx-8 text-base">
            Sticky Notes is the home for everything you need to remember, and
            everything you want to achieve.
          </div>
          {isAuthenticated ? (
            <Link to="/notes" className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                My Notes
              </button>
            </Link>
          ) : (
            <div className="flex w-max justify-center mt-4 space-x-2">
              <LoginButton />
              <SignupButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
