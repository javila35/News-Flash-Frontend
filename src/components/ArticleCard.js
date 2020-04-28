import React from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';

function ArticleCard(props) {
    const token = localStorage.getItem("token");
    const {title, author, content, url, urlToImage} = props.article;
    const bookmark = () => {
        const send = {
            user: props.user,
            title: title,
            link: url,
            img_url: urlToImage
        };
        api.articles.postBookmark(send).then(data=>console.log(data))
    };

    const comment = () => {
        alert("create ternary, if comments exist add to. Or if they don't begin discussion");
    };

    

    return(
        <div className="article-card">
            <h3>{title}</h3>
            <h5>by: {author}</h5>
            <p>{content}</p>
            <div className="user-interaction">
                <a href={`${url}`}>Read article here</a>
                {token ? <p className="bookmark" onClick={() => bookmark()}>Bookmark</p> :null}
                {token ? <p className="comment-icon" onClick={() => comment()}>Comment</p> :null}
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