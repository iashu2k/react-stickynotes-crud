import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import Form from "./components/form";

import Background from "./images/weather.png";

function App() {
  return (
    <div
      className="min-h-screen font-body"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div>
        <Navbar />
        <Switch>
          <Route path="/" component={Notes} exact />
          <Route path="/add" component={Form} />
          <Route path="/update/:id" component={Form} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
