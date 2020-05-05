import React, { Component } from 'react';

class BookmarkCard extends Component {

    
    
    render() {
        const {article_img, article_link, article_title} = this.props.bookmark;
        return (
            <div className="bookmark-card">
                <img src={article_img} alt={`${article_title} thumbnails`} className="bookmark-thumbnail"/>
                <p className="bookmark-title">{article_title}</p>
                <div className="discussion">
                    <a href={article_link} className="bookmark-link">Read the article.</a>
                    <p className="bookmark-link" onClick={() => this.props.handleClick(this.props.bmID)}>Discussion</p>
                </div>
            </div>
        )
    };
};

export default BookmarkCard;