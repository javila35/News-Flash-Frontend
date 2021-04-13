import * as React from "react";
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { BookmarksOutlined } from "@material-ui/icons";
import { api, createBookmark, useCurrentUserContext } from "../services/";
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
  const [isToastOpen, setToastOpen] = React.useState<boolean>(false);
  const token = localStorage.getItem("token");
  const { currentUser } = useCurrentUserContext();
  const { icon, tile } = useStyles();

  const postBookmark = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (currentUser) {
      createBookmark(article, currentUser.id, setToastOpen);
    }
  };

  const handleCloseToast = () => setToastOpen(false);

  const handleClick = () => {
    window.open(url, "_blank");
  };

  const { image, source, title, url } = article;
  return (
    <>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Bookmark created"
        open={isToastOpen}
        onClose={handleCloseToast}
      />
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
    </>
  );
};
