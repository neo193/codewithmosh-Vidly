import React from "react";
import LikeButton from "./like";

const MoviesTable = ({ movies, onLike, onDelete, onSort, currentSort }) => {
  return (
    <table className="table table-hover ms-2">
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
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
            onClick={() => onSort("genre.name")}
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
            onClick={() => onSort("numberInStock")}
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
            onClick={() => onSort("dailyRentalRate")}
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
};

export default MoviesTable;
