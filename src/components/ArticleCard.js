import React from 'react';
import { api } from '../services/api';

/**
 * TODO: 
 * [ ] Refactor to Typescript
 * [ ] Type props
 */
export const ArticleCard = (props) => {
    const token = localStorage.getItem("token");

    const { title, author, description, url, image } = props.article;

    const bookmark = () => {
        const send = {
            user: props.user,
            title: title,
            link: url,
            img_url: image
        };
        api.bookmarks.postBookmark(send)
    };

    return (
        <div className="article-card">
            { image ? <img src={image} alt={title}></img> : null}
            <h2>{title}</h2>
            <h5>by: {author}</h5>
            <p>{description}</p>
            <a href={`${url}`}>Read article here</a>
            <div className="user-interaction">

                {token ? <button className="bookmarker" onClick={() => bookmark()}>Bookmark</button> : null}
            </div>
        </div>
    );
};