import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getMovieSearch } from "../../actions/movieActions";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      person: "",
      movie: "",
      link: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    if (e.target.name == "movie") {
      this.setState({ person: "" });
      this.setState({ link: "/movies" });
    } else {
      this.setState({ movie: "" });
      this.setState({ link: "/people" });
    }
  }

  submit() {
    if (this.state.movie.length !== 0 && this.state.person.length === 0) {
      this.props.getMovieSearch(this.state.movie);
    }
    if (this.state.movie.length !== 0 && this.state.person.length === 0) {
      this.props.getMovieSearch(this.state.movie);
    }
  }

  render() {
    return (
      <div className="col-lg-8 mx-auto my-2">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Movies
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="ex) 'Cast Away'"
            name="movie"
            value={this.state.movie}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <div className="input-group-prepend ml-2">
            <span className="input-group-text rounded-left" id="">
              People
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="ex) 'Tom Hanks'"
            name="person"
            value={this.state.person}
            onClick={this.onClick}
            onChange={this.onChange}
          />
          <Link
            to={this.state.link}
            className="btn btn-primary"
            onClick={this.submit}
          >
            Search
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getMovieSearch }
)(Search);
