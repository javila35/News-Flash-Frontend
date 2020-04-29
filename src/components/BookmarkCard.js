import React, { Component } from 'react';

class BookmarkCard extends Component {

   
    render() {
        const {article_img, article_link, article_title} = this.props.bookmark;
        return (
            <div className="bookmark-card">
                <img src={article_img} alt={`${article_title} thumbnails`} className="bookmark-thumbnail"/>
                <p className="bookmark-title">{article_title}</p>
                <a href={article_link} className="bookmark-link">Read the article.</a>
                <p className="comment-icon" onClick={()=>this.props.fetchComments(this.props.bmID)}>Comment</p>
            </div>
        )
    };
};

export default BookmarkCard;