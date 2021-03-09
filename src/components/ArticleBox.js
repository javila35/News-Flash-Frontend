import * as React from "react";
import { api } from "../services/";

/**
 * TODO
 * [ ] Refactor to FC
 * [ ] Refactor to TS
 * [ ] Type state and props
 */
export const ArticleBox = (props) => {
    const token = localStorage.getItem("token");

    const bookmarker = () => {
        return (<button className="bookmarker" onClick={() => postBookmark()}>Bookmark</button>)
    };

    const postBookmark = () => {
        const send = {
            user: props.user,
            title: props.details.title,
            link: props.details.url,
            img_url: props.details.urlToImage
        }
        api.bookmarks.postBookmark(send)
    }

    return (
        <div className="div-box">
            { props.details.image ? <img className="thumbnail" src={props.details.image} alt={props.details.title}></img> : null}
            <a href={props.details.url}>{props.details.title}</a><br />
            {token ? bookmarker() : null}
        </div>
    )
};