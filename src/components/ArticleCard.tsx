import * as React from "react";
import { api, createBookmark, useCurrentUserContext } from "../services/";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Snackbar,
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
  const [isToastOpen, setToastOpen] = React.useState<boolean>(false);
  const token = localStorage.getItem("token");
  const { actions, card, media } = useStyles();
  const { currentUser } = useCurrentUserContext();

  const { title, source, description, url, image } = article;

  const postBookmark = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (currentUser) {
      createBookmark(article, currentUser.id, setToastOpen);
    }
  };

  const handleCloseToast = () => setToastOpen(false);

  const onClick = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Bookmark created"
        open={isToastOpen}
        onClose={handleCloseToast}
      />
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
          {token && currentUser && (
            <Button onClick={postBookmark}>Bookmark</Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};
