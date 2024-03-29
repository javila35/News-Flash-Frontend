import * as React from "react";
import Loader from "react-loading";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Container, Typography } from "@material-ui/core";
import {
  api,
  useCurrentUserContext,
  BookmarkDTO,
  // UserDTO
} from "../services";
import { CommentForm } from "../components";

type BookmarkParams = {
  id: string;
};

type BookmarkQueryResponse = {
  data: {
    /** Bookmark id */
    id: number;
    /** Bookmark details */
    attributes: BookmarkDTO;
  };
};

// type BookmarkState = BookmarkDTO | null;

// TODO: Refactor to MUI
// TODO: Type query response
// TODO: Type payload
// TODO: Type commentsDTO
// TODO: Ensure functionality

export const Bookmark: React.FC = () => {
  const { id } = useParams<BookmarkParams>();
  const token = localStorage.getItem("token");
  const { currentUser } = useCurrentUserContext();
  const { isLoading, error, data } = useQuery<BookmarkQueryResponse, Error>(
    ["GetBookmark", id],
    () => api.bookmarks.getBookmark((id as unknown) as number)
  );

  const renderBookmark = () => {
    if (data?.data.attributes) {
      const { article_img, article_link, article_title } = data.data.attributes;
      return (
        <Container>
          <img src={article_img} alt={`${article_title} thumbnail`}></img>
          <Typography variant="h2">{article_title}</Typography>
          <a href={article_link}>Read more.</a>
        </Container>
      );
    }
  };

  const renderComments = () => {
    if (data?.data?.attributes?.comments) {
      return data.data.attributes.comments.map((comment, index) => {
        // TODO: Figure out how to fetch username of user who created comment
        console.log(comment);
        return (
          <Container key={index}>
            <p>{comment.comment_text}</p>
            <Typography variant="h6">Posted by: {comment.user_id}</Typography>
          </Container>
        );
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <>"An error has occured: " + {error.message}</>;
  if (data?.data?.attributes)
    return (
      <Container>
        {renderBookmark()}
        <Container className="post-comments">
          <Typography variant="h3">Comments</Typography>
          {renderComments()}
          {token && currentUser ? (
            <CommentForm
              /** TODO: Fix this type coercion (?) */
              bookmarkId={(id as unknown) as number}
            />
          ) : (
            <p>Log in to comment.</p>
          )}
        </Container>
      </Container>
    );
  return (
    <>
      {console.warn("Unable to fetch data")}
      <Loader />
    </>
  );
};
