import React from "react";

const LikeButton = (props) => {
  return (
    <i
      className={`fa ${props.liked ? "fa-heart" : "fa-heart-o"}`}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    ></i>
  );
};

export default LikeButton;
