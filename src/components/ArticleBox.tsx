import * as React from "react";
import { Button, Container } from "@material-ui/core";
import { api } from "../services/";
import { ArticleCardProps } from "./ArticleCard";

/**
 * TODO
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 */
export const ArticleBox: React.FC<ArticleCardProps> = ({ article, currentUser }) => {
    const token = localStorage.getItem("token");

    const bookmarker = () => {
        return (<Button className="bookmarker" onClick={() => postBookmark()}>Bookmark</Button>)
    };

    const postBookmark = () => {
        if (currentUser) {
            const send = {
                user_id: currentUser.id,
                article_title: article.title,
                article_link: article.url,
                img_url: article.image,
            }
            api.bookmarks.postBookmark(send);
        }
    }

    return (
        <Container>
            { article.image ? <img className="thumbnail" src={article.image} alt={article.title}></img> : null}
            <a href={article.url}>{article.title}</a><br />
            {token ? bookmarker() : null}
        </Container>
    )
};