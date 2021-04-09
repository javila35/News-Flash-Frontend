import * as React from "react";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import { api, useCurrentUserContext } from "../services/";
import { ArticleCardProps } from "./ArticleCard";

// TODO: Change the name of this component to something more descriptive after refactor
export const ArticleBox: React.FC<ArticleCardProps> = ({ article }) => {
  const token = localStorage.getItem("token");
  const { currentUser } = useCurrentUserContext();

  const postBookmark = () => {
    if (currentUser) {
      const send = {
        user_id: currentUser.id,
        article_title: article.title,
        article_link: article.url,
        img_url: article.image,
      };
      api.bookmarks.postBookmark(send);
    }
  };

  const handleClick = () => {
    window.open(url, "_blank");
  };

  const { image, source, title, url } = article;
  console.log("article", article);
  return (
    <GridListTile key={title} onClick={handleClick}>
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
              <Info />
            </IconButton>
          )
        }
      />
    </GridListTile>
  );
};
