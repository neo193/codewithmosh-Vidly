import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movieID) => {
    const updatedMovies = this.state.movies.filter(
      (movie) => movie._id !== movieID
    );
    this.setState({ movies: updatedMovies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
    console.log(movies[index]);
  };

  handleEmptyDatabase = () => {
    return this.state.movies.length === 0
      ? "There are no movies in the Database!"
      : `There are ${this.state.movies.length} movies in the database!`;
  };

  render() {
    return (
      <main className="container">
        <div className="col text-center">
          <p className="lead">{this.handleEmptyDatabase()}</p>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>${movie.dailyRentalRate}</td>
                <td>
                  <LikeButton
                    id={movie._id}
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

export default Movies;
