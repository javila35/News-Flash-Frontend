import * as React from "react";
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { BookmarksOutlined } from "@material-ui/icons";
import { api, useCurrentUserContext } from "../services/";
import { ArticleCardProps } from "./ArticleCard";

const classes = {
  tile: {
    width: "100%",
  },
  icon: {
    color: "white",
  },
};

const useStyles = makeStyles(classes);

/** Grid box for front page display */
export const GridBox: React.FC<ArticleCardProps> = ({ article }) => {
  const token = localStorage.getItem("token");
  const { currentUser } = useCurrentUserContext();
  const { icon, tile } = useStyles();

  // TODO: Create a toast to confirm bookmark
  const postBookmark = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (currentUser) {
      const send = {
        userId: currentUser.id,
        articleTitle: article.title,
        articleLink: article.url,
        imgUrl: article.image,
      };
      api.bookmarks.postBookmark(send);
    }
  };

  const handleClick = () => {
    window.open(url, "_blank");
  };

  const { image, source, title, url } = article;
  return (
    <GridListTile key={title} onClick={handleClick} className={tile}>
      {image && (
        <img
          src={image}
          alt={title}
          style={{ height: "auto", maxWidth: "100%" }}
        />
      )}
      <GridListTileBar
        title={title}
        subtitle={`By: ${source.name}`}
        actionIcon={
          token &&
          currentUser && (
            <IconButton onClick={postBookmark}>
              <BookmarksOutlined className={icon} />
            </IconButton>
          )
        }
      />
    </GridListTile>
  );
};
