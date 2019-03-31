import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// imp proptypes
import PropTypes from "prop-types";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      person: null
    };
  }
  componentWillMount() {
    console.log("cwm");
    console.log(this.props);
    if (this.props.person !== null) {
      this.setState({ person: this.props.person });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp");
    console.log(nextProps);
    if (nextProps.person !== null) {
      this.setState({ person: nextProps.person });
    }
  }

  // START HERE:  Trying to person details to the view

  render() {
    var display;
    if (this.state.person !== null) {
      display = <div>{this.state.person.name} </div>;
    }
    return { display };
  }
}

const mapStateToProps = state => ({
  loading: state.people.loading,
  display: state.people.display,
  person: state.people.person
});

export default connect(
  mapStateToProps,
  null
)(Details);
