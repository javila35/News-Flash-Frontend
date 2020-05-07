import React from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';

function ArticleCard(props) {
    const token = localStorage.getItem("token");

    const {title, author, description, url, urlToImage} = props.article;

    const bookmark = () => {
        const send = {
            user: props.user,
            title: title,
            link: url,
            img_url: urlToImage
        };
        api.bookmarks.postBookmark(send)
    };

    return(
        <div className="article-card">
            <img src={urlToImage} alt={title}></img>
            <h2>{title}</h2>
            <h5>by: {author}</h5>
            <p>{description}</p>
            <a href={`${url}`}>Read article here</a>
            <div className="user-interaction">
                
                {token ? <button className="bookmarker" onClick={() => bookmark()}>Bookmark</button> :null}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(ArticleCard);