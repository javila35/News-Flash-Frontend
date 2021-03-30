import React from "react";

function Comment(props) {
  return (
    <div className="comment-card">{`${props.idProp}: ${props.comment}`}</div>
  );
}

export default Comment;
