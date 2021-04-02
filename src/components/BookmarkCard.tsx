import * as React from "react";
import { Button, Container } from "@material-ui/core";
import { BookmarkDTO } from "../services";

type BookmarkCardProps = {
  /** Bookmark object to display */
  bookmark: BookmarkDTO;
  /** Callback to display bookmark discussion */
  handleClick: (id: number) => void;
};
/** TODO:
 * [x] Refactor to TS
 * [ ] Refactor to MUI
 * [x] Type props
 */
export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark,
  handleClick,
}) => {
  const { article_img, article_link, article_title, id } = bookmark;
  return (
    <Container>
      <img src={article_img} alt={`${article_title} thumbnail`} />
      {/* TODO: Use Typography */}
      <p>{article_title}</p>
      <Container>
        <a href={article_link}>
          <Button>Read the article.</Button>
        </a>
        {/* TODO: Use Typography */}
        <Button onClick={() => handleClick(id)}>Discussion</Button>
      </Container>
    </Container>
  );
};
