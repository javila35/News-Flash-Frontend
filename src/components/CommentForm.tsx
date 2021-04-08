import * as React from "react";
import { api, useCurrentUserContext } from "../services/";
import { Loader } from "./Loader";

type CommentFormProps = {
  /** Bookmark to post comment to. */
  bookmarkId: number;
};

/** TODO
 * [ ] Refactor to React-Query?
 * [ ] Refactor to Material UI
 * [ ] Handle edge case where user is not present
 *  - Currently returning a loader
 */
export const CommentForm: React.FC<CommentFormProps> = ({ bookmarkId }) => {
  const [comment, setComment] = React.useState<string>("");
  const { currentUser } = useCurrentUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const payload = {
        user_id: currentUser.id,
        comment_text: comment,
        bookmark_id: bookmarkId,
      };
      api.comments.postComment(payload).then((data) => {
        console.log(data);
      });
    }
  };

  if (currentUser) {
    return (
      <div className="comment-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            onChange={handleChange}
            name="comment"
            placeholder="Enter comment."
          ></input>
          <input type="submit" value="Add Comment"></input>
        </form>
      </div>
    );
  } else {
    return <Loader />;
  }
};
