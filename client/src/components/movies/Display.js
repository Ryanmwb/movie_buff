import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// imp proptypes
import PropTypes from "prop-types";

//import actions
import { getMovieDetails } from "../../actions/movieActions";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      page: null,
      totalPages: null,
      loading: true,
      title: "Loading..."
    };
    this.getDetails = this.getDetails.bind(this);
  }

  componentWillMount() {
    console.log("cwm. this.props...");
    console.log(this.props);
    if (this.props.display === null && this.props.loading === true) {
      this.props.history.push("/");
    }
    // based on the display prop, we will set the state.movies
    if (this.props.display === "upcoming" && this.props.upcoming !== null) {
      this.setState({ movies: this.props.upcoming.results });
    }
    if (this.props.display === "now_playing" && this.props.loading == false) {
      this.setState({ movies: this.props.nowPlaying.results });
      this.setState({ page: this.props.nowPlaying.page });
      this.setState({ totalPages: this.props.nowPlaying.total_pages });
    }
    /* if (this.props.display == "upcoming" && this.props.upcoming != null) {
      this.setState({ movies: this.props.upcoming.results });
    }
    if (this.props.display == "upcoming" && this.props.upcoming != null) {
      this.setState({ movies: this.props.upcoming.results });
    }
    if (this.props.display == "upcoming" && this.props.upcoming != null) {
      this.setState({ movies: this.props.upcoming.results });
    }
    if (this.props.display == "upcoming" && this.props.upcoming != null) {
      this.setState({ movies: this.props.upcoming.results });
    } */
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp called...");
    console.log(nextProps);
    // set local state after loading is finished
    if (nextProps.loading == false) {
      this.setState({ title: nextProps.display });
    }
    if (nextProps.display === "Coming Soon") {
      this.setState({ movies: nextProps.upcoming.results });
      this.setState({ loading: false });
    }
    if (nextProps.display === "Now Playing") {
      this.setState({ movies: nextProps.nowPlaying.results });
      this.setState({ loading: false });
      this.setState({ page: nextProps.nowPlaying.page });
    }
    if (nextProps.display === "Search Results") {
      this.setState({ movies: nextProps.search.results });
      this.setState({ loading: false });
      this.setState({ page: nextProps.search.page });
    }
  }

  getDetails(id) {
    console.log("getDetails().....");
    this.props.getMovieDetails(id);
  }

  render() {
    var display;
    if (!this.state.loading) {
      var display = this.state.movies.map(movie => {
        var img = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
        var alt = `Poster for '${movie.title}'`;
        var date = movie.release_date.split("-");
        var dateReformatted = [date[1], date[2], date[0]].join("/");
        return (
          <Link
            to="/movie/details"
            key={movie.id}
            className="movie col-lg-3 col-md-4 col-sm-6 mx-auto mb-5 text-light"
            onClick={() => this.getDetails(movie.id)}
          >
            <img
              className="mx-0"
              src={img}
              alt={alt}
              style={{ display: "block", borderRadius: "10px" }}
            />
            <h3 className="display-5 text-light">{movie.title}</h3>
            <h5>Rating: {movie.vote_average}</h5>
            <h5>{dateReformatted}</h5>
          </Link>
        );
      });
    }
    return (
      <div className="display px-5">
        <h1 className="display-2 mx-auto text-light">{this.state.title}</h1>
        <div className="row">{display}</div>
        <h5 className="text-center text-light">page:{this.state.page}</h5>
      </div>
    );
  }
}

Display.propTypes = {
  display: PropTypes.string,
  upcoming: PropTypes.object,
  nowPlaying: PropTypes.object,
  recommendations: PropTypes.object,
  discover: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  display: state.movie.display,
  upcoming: state.movie.upcoming,
  nowPlaying: state.movie.nowPlaying,
  recommendations: state.movie.recocommendations, //has page prop
  discover: state.movie.discover, // hase page, total_results, total_pages props
  loading: state.movie.loading,
  search: state.movie.search
});

// TODO: if I refresh the page, it is permanently loading.
// TODO: if nowplaying or upcoming has already been called, I shouldn't have to call axios again
// TODO: add a page feature

export default connect(
  mapStateToProps,
  { getMovieDetails }
)(Display);
