import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ total, onPageChange, currentPage, perPage }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages === 1) return null;

  const pageNumbers = _.range(1, totalPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

export default Pagination;
