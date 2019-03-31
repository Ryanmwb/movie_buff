import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; // marking BrowserRouter `as` Router allows you to call it as `Router` instead of `BrowserRouter`
import { Provider } from "react-redux";

// import movie components
import Display from "./components/movies/Display";
import Discover from "./components/movies/Discover";

// import layout components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Search from "./components/layout/Search";

// css styling
import "./App.css";

// import store
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App ">
            <Navbar />
            <Search />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/movies" component={Display} />
              <Route exact path="/discover" component={Discover} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

//hours wed-thu 5, fri 6

// TODO: load nowplaying and upcoming when the page first loads

export default App;
