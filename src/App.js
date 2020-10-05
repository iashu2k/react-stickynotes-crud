import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import Form from "./components/form";
import { useAuth0 } from "@auth0/auth0-react";
import Background from "./images/weather.png";
import Landing from "./components/landing";
import Loading from "./components/loading";
import PrivateRoute from "./components/private-route";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

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
          <PrivateRoute path="/notes" component={Notes} />
          <PrivateRoute path="/add" component={Form} />
          <PrivateRoute path="/update/:id" component={Form} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
