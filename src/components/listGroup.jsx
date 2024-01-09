import React from "react";

const ListGroup = ({ genres, onFilter, active, textProp, valueProp }) => {
  return (
    <div className="list-group">
      <a
        href="#"
        onClick={() => onFilter(null)}
        className={`list-group-item list-group-item-action ${
          active === null ? "active" : ""
        }`}
      >
        All Genres
      </a>
      {genres.map((g) => (
        <a
          key={g[valueProp]}
          href="#"
          onClick={() => onFilter(g)}
          className={`list-group-item list-group-item-action ${
            active === g ? "active" : ""
          }`}
        >
          {g[textProp]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id",
};

export default ListGroup;
