import React from "react";
import NotesImage from "../images/NotesImage.svg";

const Landing = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Landing;
