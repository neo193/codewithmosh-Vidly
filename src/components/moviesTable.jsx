import React, { Component } from "react";
import LikeButton from "./like";

class MoviesTable extends Component {
  raiseSort = (sortBy) => {
    const sortColumn = { ...this.props.currentSort };
    if (sortColumn.path === sortBy)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = sortBy;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, currentSort, onLike, onDelete } = this.props;
    return (
      <table className="table table-hover ms-2">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("title")}
            >
              Title
              <i
                className={
                  currentSort.path === "title"
                    ? currentSort.order === "asc"
                      ? "ms-2 fa fa-sort-asc"
                      : "ms-2 fa fa-sort-desc"
                    : "hidden"
                }
              ></i>
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("genre.name")}
            >
              Genre
              <i
                className={
                  currentSort.path === "genre.name"
                    ? currentSort.order === "asc"
                      ? "ms-2 fa fa-sort-asc"
                      : "ms-2 fa fa-sort-desc"
                    : "hidden"
                }
              ></i>
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("numberInStock")}
            >
              Stock
              <i
                className={
                  currentSort.path === "numberInStock"
                    ? currentSort.order === "asc"
                      ? "ms-2 fa fa-sort-asc"
                      : "ms-2 fa fa-sort-desc"
                    : "hidden"
                }
              ></i>
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort("dailyRentalRate")}
            >
              Rate
              <i
                className={
                  currentSort.path === "dailyRentalRate"
                    ? currentSort.order === "asc"
                      ? "ms-2 fa fa-sort-asc"
                      : "ms-2 fa fa-sort-desc"
                    : "hidden"
                }
              ></i>
            </th>
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
                  onClick={() => onLike(movie)}
                />
              </td>
              <td className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
