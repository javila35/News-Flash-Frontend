import * as React from "react";
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { BookmarksOutlined } from "@material-ui/icons";
import { createBookmark, useCurrentUserContext } from "../services/";
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
  /** Destructure properties for easier access */
  const { title, source, description, url, image } = article;

  const token = localStorage.getItem("token");
  const { currentUser } = useCurrentUserContext();
  const { icon, tile } = useStyles();

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
  const handleClick = () => {
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
