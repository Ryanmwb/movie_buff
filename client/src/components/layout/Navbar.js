import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//import actions
import { getComingSoon, getNowPlaying } from "../../actions/movieActions";

class Navbar extends Component {
  constructor() {
    super();
    this.upComing = this.upComing.bind(this);
    this.nowPlaying = this.nowPlaying.bind(this);
  }

  upComing() {
    console.log("navbar upcoming called...");
    this.props.getComingSoon();
  }

  nowPlaying() {
    console.log("nowPlaying() called...");
    this.props.getNowPlaying();
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
            <div className="bg-light row rounded ml-3">
              <h5 className="my-auto border-right border-dark">Movies</h5>
              <ul className="navbar-nav mr-auto">
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
                    className="nav-link"
                    to="/movies"
                    onClick={this.nowPlaying}
                  >
                    Now Playing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/discover">
                    Discover
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
  { getNowPlaying, getComingSoon }
)(Navbar);
