import React from "react";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;