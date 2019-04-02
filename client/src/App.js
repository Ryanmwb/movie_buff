import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; // marking BrowserRouter `as` Router allows you to call it as `Router` instead of `BrowserRouter`
import { Provider } from "react-redux";

// import movie components
import MovieDisplay from "./components/movies/Display";
import MovieDetails from "./components/movies/Details";
import Discover from "./components/movies/Discover";

// import people components
import PersonDisplay from "./components/people/Display";
import PersonDetails from "./components/people/Details";

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
            <Navbar path="/" />
            <Search path="/" />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/movies" component={MovieDisplay} />
              <Route exact path="/movie/details" component={MovieDetails} />
              {/* <Route exact path="/discover" component={Discover} /> */}
              <Route exact path="/people" component={PersonDisplay} />
              <Route exact path="/people/details" component={PersonDetails} />
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
