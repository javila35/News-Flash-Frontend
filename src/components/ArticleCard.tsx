import * as React from "react";
import { api, useCurrentUserContext } from "../services/";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Article } from "../services";

export type ArticleCardProps = {
  /** Article to display */
  article: Article;
};

const classes = {
  actions: {
    justifyContent: "center",
  },
  card: {
    marginBottom: "1em",
  },
  media: {
    height: 600,
    backgroundSize: "cover",
    objectFit: "contain" as const,
  },
};

const useStyles = makeStyles(classes);

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const token = localStorage.getItem("token");
  const { actions, card, media } = useStyles();
  const { currentUser } = useCurrentUserContext();

  const { title, source, description, url, image } = article;

    // TODO: Create a toast to confirm bookmark
  const bookmark = () => {
    if (currentUser) {
      const send = {
        userId: currentUser.id,
        articleTitle: title,
        articleLink: url,
        imgUrl: image,
      };
      api.bookmarks.postBookmark(send);
    }
  };

  const onClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Card className={card} elevation={0}>
      <CardActionArea onClick={onClick}>
        {image && (
          <CardMedia
            src={image}
            component="img"
            className={media}
            title={title}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="p" gutterBottom>
            {title}
          </Typography>
          {source?.name && (
            <Typography variant="h5" component="p">
              by: {source.name}
            </Typography>
          )}
          <Typography variant="body1">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={actions}>
        {token && currentUser && <Button onClick={bookmark}>Bookmark</Button>}
      </CardActions>
    </Card>
  );
};
