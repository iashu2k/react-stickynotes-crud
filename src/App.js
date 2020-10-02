import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import Form from "./components/form";

import Background from "./images/weather.png";
import Landing from "./components/landing";

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
          <Route path="/" component={Landing} exact />
          <Route path="/notes" component={Notes} />
          <Route path="/add" component={Form} />
          <Route path="/update/:id" component={Form} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
