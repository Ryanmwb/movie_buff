import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// imp proptypes
import PropTypes from "prop-types";

// imp actions
import { getPersonDetails } from "../../actions/personActions";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      people: null,
      page: null,
      totalPages: null,
      loading: true,
      title: "Loading..."
    };
    this.getPerson = this.getPerson.bind(this);
  }
  componentWillMount() {
    // set people state, if props is not null
    if (this.props.people !== null) {
      this.setState({ people: this.props.people });
      this.setState({ title: this.props.display });
    }
    if (this.props.display === null && this.props.loading === true) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.people != null) {
      this.setState({ people: nextProps.people });
      this.setState({ loading: false });
      this.setState({ title: nextProps.display });
    }
  }

  getPerson(e) {
    console.log("e.target.value is....");
    console.log(e.target.key);
    this.props.getPersonDetails(e.target.value);
  }

  render() {
    var display;
    if (this.state.people !== null) {
      var display = this.state.people.map(person => {
        var img = `https://image.tmdb.org/t/p/w185/${person.profile_path}`;
        var alt = `Profile of ${person.name}`;
        return (
          <Link
            to="/people/details"
            className="person col-lg-3 col-md-4 col-sm-6 mx-auto mb-5 text-light"
            onClick={this.getPerson}
            key={person.id}
          >
            <div>
              <img
                src={img}
                alt={alt}
                className="mx-0"
                style={{ display: "block", borderRadius: "10px" }}
              />
              <h3 className="display-5 text-light">{person.name}</h3>
            </div>
          </Link>
        );
      });
    }
    return (
      <div className="display px-5">
        <h1 className="display-2 mx-auto text-light">{this.state.title}</h1>
        <div className="row">{display}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.people.loading,
  display: state.people.display,
  people: state.people.people
});

export default connect(
  mapStateToProps,
  { getPersonDetails }
)(Display);

// TODO make peope/movie posters clickable for more details
