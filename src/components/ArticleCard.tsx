import * as React from "react";
import { createBookmark, useCurrentUserContext } from "../services/";
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
  /** Destructure properties for easier access */
  const { title, source, description, url, image } = article;

  const token = localStorage.getItem("token");
  const { actions, card, media } = useStyles();
  const { currentUser } = useCurrentUserContext();

  /** Toast pop up state management */
  const [isToastOpen, setToastOpen] = React.useState<boolean>(false);
  const handleCloseToast = () => setToastOpen(false);

  const postBookmark = (e: React.MouseEvent<HTMLElement>) => {
    /** Capture click to prevent link from opening in new tab */
    e.stopPropagation();
    if (currentUser) {
      createBookmark(article, currentUser.id, setToastOpen);
    }
  };

  /** On click to open article link in new tab */
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
