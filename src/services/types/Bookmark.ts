import { api } from "../api";
import { Article } from "./Article";

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

// TODO: Convert this to camelcase
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

/** Method to create a bookmark and pop up notification */
export const createBookmark = (
  article: Article,
  userId: number,
  openToastCallback: (t: boolean) => void
) => {
  const bookmark = {
    userId: userId,
    articleTitle: article.title,
    articleLink: article.url,
    imgUrl: article.image,
  };
  api.bookmarks.postBookmark(bookmark);
  openToastCallback(true);
};
