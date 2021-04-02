import * as React from "react";
import { api, UserDTO } from "../services/";
import { Button, Container, Typography } from "@material-ui/core";

type Article = {
  /** Author of article */
  author?: string;
  /** First portion of article */
  description: string;
  /** Link to article screenshot */
  image: string;
  /** Title of article */
  title: string;
  /** Link to article */
  url: string;
};

export type ArticleCardProps = {
  /** Article to display */
  article: Article;
  /** Current authenticated user */
  currentUser?: UserDTO;
};

/**
 * TODO:
 * [x] Refactor to Typescript
 * [ ] Type props
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  currentUser,
}) => {
  const token = localStorage.getItem("token");

  const { title, author, description, url, image } = article;

  const bookmark = () => {
    if (currentUser) {
      const send = {
        user_id: currentUser.id,
        article_title: title,
        article_link: url,
        img_url: image,
      };
      api.bookmarks.postBookmark(send);
    }
  };

  return (
    <Container className="article-card">
      {image ? <img src={image} alt={title}></img> : null}
      <Typography variant="h2">{title}</Typography>
      {author ? <Typography variant="h5">by: {author}</Typography> : null}
      <p>{description}</p>
      <a href={`${url}`}>Read article here</a>
      <div className="user-interaction">
        {token && currentUser ? (
          <Button className="bookmarker" onClick={() => bookmark()}>
            Bookmark
          </Button>
        ) : null}
      </div>
    </Container>
  );
};
