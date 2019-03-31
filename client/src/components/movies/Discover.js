import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      searchName: null,
      actors: [],
      startDate: null,
      endDate: null,
      genres: "",
      sortBy: "popDec"
    };
    this.find = this.find.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name !== "genres") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
    }
  }

  find() {
    axios
      .post("/api/person/search", { query: this.state.searchName })
      .then(res => {
        this.setState({ actors: res.data.results });
        console.log("res.data.results...");
        console.log(res.data.results);
      })
      .then(console.log(this.state));
  }

  submit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  addRemoveGenre(e) {
    console.log("addremovegenre");
    var temp = this.state.genres;
    var index = temp.findIndex(e.target.value);
    console.log(index);
  }

  render() {
    var actors = this.state.actors.map(actor => (
      <div className="col-3">{actor.name}</div>
    ));
    return (
      <div>
        <form className="col-md-9 bg-light rounded mx-auto py-3">
          <h1 className="display-3 text-center mb-4">Discover New Movies</h1>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Between Dates
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Start Date"
              name="startDate"
              value={this.state.startDate}
              onChange={this.state.onChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="End Date"
              name="endDate"
              value={this.state.endDate}
              onChange={this.state.onChange}
            />
          </div>
          <small className="form-text text-muted ml-5 mb-3">
            Format m/d/y (03/06/1994)
          </small>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Sort By
              </span>
            </div>
            <select
              name="sortBy"
              id="sortBy"
              className="col"
              onChange={this.onChange}
              value={this.state.sortBy}
            >
              <option defaultValue value="popDes">
                Popularity &#8681;
              </option>
              <option value="popAsc">Popularity &#8679;</option>
              <option value="relDec">Release Date &#8681;</option>
              <option value="relAsc">Release Date &#8679;</option>
              <option value="revDec">Revenue &#8681;</option>
              <option value="revAsc">Revenue &#8679;</option>
              <option value="ratDec">Rating &#8681;</option>
              <option value="ratAsc">Rating &#8679;</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <option onClick={this.addRemoveGenre} value="28">
              Action
            </option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Add Cast
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Actor/Actress Name"
              aria-label=""
              aria-describedby="basic-addon1"
              name="query"
              value={this.state.name}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                onClick={this.find}
                type="button"
              >
                Find
              </button>
            </div>
          </div>
          <small className="form-text text-muted ml-5 mb-3">
            Movies returned will have to include these cast members. Search one
            at a time.
          </small>
          Actors: {actors}
          <button type="button" class="btn btn-outline-primary">
            Primary
          </button>
          <div className="form-group">
            <button onClick={this.submit} className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Discover);
