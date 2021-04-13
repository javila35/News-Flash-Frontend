/** Create a new bookmark */
export type CreateBookmarkDTO = {
  /** User ID to associate the bookmark to */
  userId: number;
  /** Title for the bookmark */
  articleTitle: string;
  /** Link to the published article */
  articleLink: string;
};

/** Create a new comment  */
export interface CreateCommentDTO {
  /** User ID to associate the comment to */
  user_id: number;
  /** Bookmark ID to associate the comment to */
  bookmark_id: number;
  /** Text to display */
  comment_text: string;
}

export interface CommentDTO extends CreateCommentDTO {
  /** Comment id */
  id: number;
}

export type BookmarkDTO = {
  /** Bookmark id */
  id: number;
  /** User bookmark belongs to */
  user_id: number;
  /** Title for article */
  article_title: string;
  /** Link to article */
  article_link: string;
  /** Link to article image */
  article_img: string;
  /** Array of comments to display */
  comments?: CommentDTO[];
};

// TODO export create bookmark callback from this file