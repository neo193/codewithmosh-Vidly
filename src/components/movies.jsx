import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./paging";
import { Paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
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

  handleSorting = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      recordsPerPage,
      sortColumn,
      selectedGenre,
    } = this.state;

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = Paginate(sorted, currentPage, recordsPerPage);
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
            <MoviesTable
              movies={movies}
              currentSort={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSorting}
            />
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
