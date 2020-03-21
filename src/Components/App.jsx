import React from "react";
import moviesData from "../moviesData";
import MovieItem from "../Components/MovieItem";

//console.log(moviesData);

// UI = function(state, props)

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    };
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item => {
      return item.id !== movie.id;
    });
    console.log(updateMovies);

    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    //console.log(movie);

    // const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    // updateMoviesWillWatch.push(movie);

    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  removeMovieFromWillWatch = movie => {
    //console.log(movie);

    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(item => {
      return item.id !== movie.id;
    });

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  render() {
    console.log("render", this.state, this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
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
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

// function App() {
//     return <div>{moviesData[0].title}</div>;
// }

export default App;
