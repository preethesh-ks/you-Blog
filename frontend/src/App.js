import React from "react";
import {Header} from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";




const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <h1>ff</h1>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
