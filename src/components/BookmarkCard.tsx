import * as React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { BookmarkDTO } from "../services";

type BookmarkCardProps = {
  /** Bookmark object to display */
  bookmark: BookmarkDTO;
  /** Callback to display bookmark discussion */
  handleClick: (id: number) => void;
};

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark,
  handleClick,
}) => {
  const { article_img, article_link, article_title, id } = bookmark;

  const visitLink = () => {
    window.open(article_link, "_blank");
  };

  return (
    <Card>
      <CardMedia src={article_img} component="img" title={article_title} />
      <CardContent>
        <Typography variant="h2">{article_title}</Typography>
      </CardContent>
      <CardActionArea>
        <CardActions>
          <Button onClick={visitLink} variant="text">
            Read the Article
          </Button>
          <Button onClick={() => handleClick(id)} variant="text">
            Discussion
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
