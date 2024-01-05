import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./like";
import Pagination from "./paging";
import { Paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    recordsPerPage: 4,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { movies: allMovies, currentPage, recordsPerPage } = this.state;
    const movies = Paginate(allMovies, currentPage, recordsPerPage);
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
            {movies.map((movie) => (
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
                <td className="d-flex justify-content-center align-items-center">
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
        <Pagination
          total={allMovies.length}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
          perPage={recordsPerPage}
        />
      </main>
    );
  }
}

export default Movies;
