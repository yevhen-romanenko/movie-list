import React from "react";
//import moviesData from "../moviesData";
import MovieItem from "../Components/MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";

// UI = function(state, props)

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total_pages: 0      
    };
  }

  componentDidMount() {
    console.log("App didmount");
    this.getMovies();
    // console.log("after fetch");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("App didUpdate");
    // console.log("prev data", prevProps, prevState);
    // console.log("this", this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
      console.log("App call API");
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("get data from movieDB", data);
        this.setState({
          movies: data.results,
          total_pages: data.total_pages
        });
      });
  };

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item => {
      return item.id !== movie.id;
    });
    // console.log(updateMovies);
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(item => {
      return item.id !== movie.id;
    });

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updatePage = value => {
    this.setState({
      page: this.state.page + value
    });
  };

  handleChangePage = value => {
    return () => {
      this.updatePage(value);
    };
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  render() {
    console.log("App render", this.state, this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4 mt-2">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <p>Current page: {this.state.page}</p>
                <p>Total pages: {this.state.total_pages}</p>

                <button onClick={this.handleChangePage(-1)} disabled={this.state.page === 1}>
                  Previous Page
                </button>
                <button
                  onClick={this.handleChangePage(1)}
                  disabled={this.state.page === this.state.total_pages}
                >
                  Next page
                </button>
              </div>
            </div>
            <div className="row ">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3 mt-3">
            <p>Will Watch: {this.state.moviesWillWatch.length} movies</p>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
