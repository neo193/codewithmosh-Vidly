import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./like";
import Pagination from "./paging";
import { Paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: null,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      recordsPerPage,
      selectedGenre,
    } = this.state;
    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;
    const movies = Paginate(filtered, currentPage, recordsPerPage);
    return (
      <main className="container">
        <div className="col text-center">
          <p className="lead">
            {filtered.length > 0
              ? `There are ${filtered.length} movies in the database!`
              : "There are no movies in the Database!"}
          </p>
        </div>
        <div className="d-flex">
          <div className="mt-2 col-2">
            <ListGroup
              genres={this.state.genres}
              onFilter={this.handleGenreSelect}
              active={this.state.selectedGenre}
            />
          </div>
          <div className="col ms-2">
            <table className="table table-hover ms-2">
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
              total={filtered.length}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
              perPage={recordsPerPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
