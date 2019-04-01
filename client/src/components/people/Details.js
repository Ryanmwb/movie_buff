import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// imp proptypes
import PropTypes from "prop-types";

// import actions
import { getMovieDetails } from "../../actions/movieActions";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      person: null,
      loading: true,
      title: "Loading...",
      credits: null
    };
    this.movieClick = this.movieClick.bind(this);
  }

  // TODO:  this should present the current person in state if props.loading == false.  This way we don't have to wait on API call
  componentWillMount() {
    console.log("cwm");
    console.log(this.state);
    console.log(this.props);
    if (
      this.props.loadingCredits === false &&
      this.props.loadingDetails === false
    ) {
      this.setState({
        person: this.props.person,
        credits: this.props.credits,
        loading: false,
        title: this.props.display
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp");
    console.log(nextProps);
    if (
      nextProps.loadingCredits === false &&
      nextProps.loadingDetails === false
    ) {
      console.log("credits and details are no longer loading...");
      console.log(nextProps);
      this.setState({ person: nextProps.person });
      this.setState({ credits: nextProps.credits });
      this.setState({ title: nextProps.display });
    }
  }

  movieClick(id) {
    console.log("movieClick()...");
    this.props.history.push("/movie/details");
    this.props.getMovieDetails(id);
  }

  render() {
    var display = null;
    var credits = null;
    if (this.state.person !== null && this.state.credits !== null) {
      console.log("about to create render...");
      console.log(this.state);
      // start here.. trying to get credits to show

      //set credits
      console.log("state.credits is not null anymore...");
      console.log(this.state);
      var data = this.state.credits.map(credit => (
        <tr
          key={credit.id}
          className="personCredits"
          onClick={() => this.movieClick(credit.id)}
        >
          <td scope="row" className="text-right">
            {credit.title}
          </td>
          <td className="text-center">{credit.release_date}</td>
          <td className="text-left">{credit.character}</td>
        </tr>
      ));
      credits = (
        <table className="table table-striped table-dark my-3 rounded">
          <thead>
            <tr>
              <th scope="col" className="text-right bg-dark">
                Movie Title
              </th>
              <th scope="col" className="text-center">
                Release Date
              </th>
              <th scope="col" className="text-left">
                Character
              </th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      );

      // Set person profile
      var img = `https://image.tmdb.org/t/p/w185/${
        this.state.person.profile_path
      }`;
      var alt = `Profile of ${this.state.person.name}`;
      var person = this.state.person;
      var gender;
      if (person.gender == 1) {
        gender = "Female";
      } else {
        gender = "Male";
      }
      var deathday = null;
      if (person.deathday !== null) {
        deathday = (
          <h6 className="text-light text-center">
            Deathday: {person.deathday}
          </h6>
        );
      }
      var birthPlace = null;
      if (person.place_of_birth !== null) {
        birthPlace = (
          <div className="text-center">
            <small className="text-light">Place of Birth: </small>
            <h6 className="text-light">{person.place_of_birth}</h6>
          </div>
        );
      }

      // display both profile and credits
      display = (
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
            <h2 className="text-light text-center display-5">{person.name}</h2>
            <img
              src={img}
              alt={alt}
              style={{ display: "block", borderRadius: "7px" }}
              className="mx-auto"
            />
            <div className="mx-auto mt-1">
              <h6 className="text-light text-center">
                <small>Gender: </small>
                {gender}
              </h6>
              <h6 className="text-light text-center">
                <small>Age: </small>
                {person.age}
              </h6>
              <h6 className="text-light text-center">
                <small>Birthday: </small>
                {person.birthday}
              </h6>
              {deathday}
              {birthPlace}
            </div>
          </div>
          <div className="col-lg-9 my-auto mx-auto px-3">
            <h5 className="text-light">
              <u>Biography</u>
            </h5>
            <p className="lead text-light">{person.biography}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="basicInfo my-3 px-2 col-lg-10 mx-auto">
        {display}
        {credits}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loadingCredits: state.people.loadingCredits,
  loadingDetails: state.people.loadingDetails,
  display: state.people.display,
  person: state.people.person,
  credits: state.people.credits
});

export default connect(
  mapStateToProps,
  { getMovieDetails }
)(Details);
