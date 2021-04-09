import * as React from "react";

type CommentProps = {
  /** ID of user who posted the comment */
  userID: number;
  /** Text to display */
  comment: string;
};

//  TODO: Convert this to a Material UI component
export const Comment: React.FC<CommentProps> = ({ userID, comment }) => {
  return <div className="comment-card">{`${userID}: ${comment}`}</div>;
};
