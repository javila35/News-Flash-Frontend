import * as React from "react";
import { api, UserDTO } from "../services/";

type CommentFormProps = {
  currentUserId: number;
  /** Bookmark to post comment to. */
  bookmarkId: number;
};

/** TODO
 * [ ] Refactor to Function component
 * [ ] Refactor to typescript
 * [ ] Type state and props?
 * [ ] Refactor to React-Query
 * [ ] Refactor to Material UI
 */
export const CommentForm: React.FC<CommentFormProps> = ({
  bookmarkId,
  currentUserId,
}) => {
  const [comment, setComment] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      user_id: currentUserId,
      comment_text: comment,
      bookmark_id: bookmarkId,
    };
    api.comments.postComment(payload).then((data) => {
      console.log(data);
    });
  };

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
};
