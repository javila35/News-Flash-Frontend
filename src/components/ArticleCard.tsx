import * as React from "react";
import { api, UserDTO } from "../services/";
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
  currentUser?: UserDTO;
};

const classes = {
  media: {
    height: 400,
    backgroundSize: "cover",
  },
};

const useStyles = makeStyles(classes);

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
  const { media } = useStyles();

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
    <Card>
      <CardActionArea>
        {image && <CardMedia image={image} className={media} title={title} />}
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
      <CardActions>
        <a href={url}>Read article here</a>
        {token && currentUser && (
          <Button size="small" onClick={() => bookmark()}>
            Bookmark
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
