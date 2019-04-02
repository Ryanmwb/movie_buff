import React, { Component } from "react";
import { connect } from "react-redux";

// imp proptypes
import PropTypes from "prop-types";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      title: "Loading...",
      details: null
    };
  }

  componentWillMount() {
    console.log("cwm");
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp");
    console.log(nextProps);
    if (nextProps.movieDetails !== null && nextProps.loadingDetails === false) {
      this.setState({ title: "Loaded", details: nextProps.movieDetails });
    }
  }

  render() {
    var display = null;
    if (this.state.details !== null) {
      var details = this.state.details;
      var backdrop = `https://image.tmdb.org/t/p/w780${details.backdrop_path}`;

      // format money
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });

      var budget = formatter.format(details.budget);
      var revenue = formatter.format(details.revenue);
      var pL = formatter.format(details.revenue - details.budget);

      display = (
        <div className="mt-3">
          <div className="mx-auto row">
            <div className="text-light col-lg-3 my-auto">
              <h5 className="text-center">{details.title}</h5>
              <h6 className="text-center">
                <small>Rating: </small>
                {details.vote_average}
              </h6>
              <h6 className="text-center">
                <small>Runtime: </small>
                {details.runtime} minutes
              </h6>
              <h6 className="text-center">
                <small>Budget: </small>
                {budget}
              </h6>
              <h6 className="text-center">
                <small>Revenue: </small>
                {revenue}
              </h6>
              <h6 className="text-center">
                <small>Profit/Loss: </small>
                {pL}
              </h6>
            </div>
            <img
              className="mr-0"
              src={backdrop}
              alt="backdrop"
              style={{ width: "780px", display: "block", borderRadius: "7px" }}
            />
          </div>
          <p className="text-light px-5 pt-3 ">
            Overview: <span className="lead">{details.overview}</span>
          </p>
        </div>
      );
    }

    return <div className="basicInfo">{display}</div>;
  }
}

const mapStateToProps = state => ({
  loadingDetails: state.movie.loadingDetails,
  movieDetails: state.movie.movieDetails
});

export default connect(
  mapStateToProps,
  null
)(Details);
