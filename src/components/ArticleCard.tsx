import * as React from "react";
import { api, UserState } from "../services/";
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
  currentUser?: UserState;
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

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  currentUser,
}) => {
  const token = localStorage.getItem("token");
  const { actions, card, media } = useStyles();

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
          {author && (
            <Typography variant="h5" component="p">
              by: {author}
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
