import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//import actions
import { getComingSoon, getNowPlaying } from "../../actions/movieActions";
import { getPopularPeople } from "../../actions/personActions";

class Navbar extends Component {
  constructor() {
    super();
    this.upComing = this.upComing.bind(this);
    this.nowPlaying = this.nowPlaying.bind(this);
    this.popular = this.popular.bind(this);
  }

  upComing() {
    console.log("navbar upcoming called...");
    this.props.getComingSoon();
  }

  nowPlaying() {
    console.log("nowPlaying() called...");
    this.props.getNowPlaying();
  }

  popular() {
    console.log("popular() called...");
    this.props.getPopularPeople();
  }

  render() {
    return (
      <nav className=" navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Movie Buff
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <div className="bg-light row rounded mx-3 px-1">
              <small className="my-auto px-2 border-right border-dark text-muted">
                Movies
              </small>
              <ul className="navbar-nav mr-3">
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark"
                    to="/movies"
                    onClick={this.upComing}
                  >
                    Upcoming
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark"
                    to="/movies"
                    onClick={this.nowPlaying}
                  >
                    Now Playing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/discover">
                    Discover
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-light row rounded mx-3 px-1 mr-auto">
              <small className="my-auto px-2 border-right border-dark text-muted">
                People
              </small>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    to="/people"
                    className="nav-link text-dark"
                    onClick={this.popular}
                  >
                    Popular
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
// TODO: I have to click on a link twice before it works
// TODO: add logo to navbar brand

export default connect(
  null,
  { getNowPlaying, getComingSoon, getPopularPeople }
)(Navbar);
