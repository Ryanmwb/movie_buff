import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// imp proptypes
import PropTypes from "prop-types";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      person: null,
      loading: true,
      title: "Loading...",
      credits: ""
    };
  }

  // TODO:  this should present the current person in state if props.loading == false.  This way we don't have to wait on API call
  componentWillMount() {
    console.log("cwm");
    console.log(this.props);
    console.log(this.state);
    if (
      this.props.person !== (null || undefined) &&
      this.props.loading === false
    ) {
      this.setState({ person: this.props.person });
    }
    if (this.props.credits !== null) {
      this.setState({ credits: this.props.credits });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp");
    console.log(nextProps);
    if (nextProps.person !== null) {
      console.log("nextprops.person not null...");
      this.setState({ person: nextProps.person });
      this.setState({ title: nextProps.display });
      this.setState({ loading: false });
    }
    if (nextProps.credits !== null) {
      console.log("abouot to update credits....");
      this.setState({ loading: false });
    }
  }

  render() {
    var display;
    if (!this.state.loading) {
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
      // start here.. trying to get credits to show

      //set credits
      var credits = null;
      if (this.props.credits !== null) {
        console.log("state.credits is not null anymore...");
        var data = this.state.credits.map(credit => (
          <tr>
            <td scope="row">{credit.title}</td>
            <td>{credit.release_date}</td>
            <td>{credit.character}</td>
          </tr>
        ));
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Movie Title</th>
              <th scope="col">Release Date</th>
              <th scope="col">Character</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>;
      }

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
  loading: state.people.loading,
  display: state.people.display,
  person: state.people.person,
  credits: state.people.credits
});

export default connect(
  mapStateToProps,
  null
)(Details);
