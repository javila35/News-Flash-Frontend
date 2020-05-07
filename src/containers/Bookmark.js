import React, { Component } from 'react';
import { api } from '../services/api';
import Loader from 'react-loading';
import CommentForm from '../components/CommentForm';


// This component will show threaded comment and the bookmark.
// Currently not being used anywhere.
class Bookmark extends Component {
    state = {
        bookmark: {},
        comments: [],
        replies: [],
        loading: true
    };

    componentDidMount() {
        this.getBookmarkDetails();
    };

    getBookmarkDetails = () => {
        const id = this.props.match.params.id
        api.bookmarks.getBookmark(id).then(data=>{
            if (data.error) {
                alert(data.error)
                this.props.history.push('/')
            } else {
                this.setState({
                    bookmark: data.data.attributes,
                    comments: this.sortComments(data.included),
                    replies: this.sortReplies(data.included),
                    loading: false
                })};
        });
    };

    sortComments = array => {
        let comments = []
        array.forEach(comment => {
            if (comment.type === 'comment') {
                comments.push(comment)
            };
        });
        return comments;
    };

    sortReplies = array => {
        let replies = []
        array.forEach(reply => {
            if (reply.type === 'reply') {
                replies.push(reply)
            };
        });
        return replies;
    };

    renderBookmark() {
        const {article_img, article_link, article_title} = this.state.bookmark;
        return(
            <div id="bookmark-show">
                <div className="post-thumb"><img src={article_img} alt={`${article_title} thumbnail`}></img><br/><br/></div>
                <div className="post-title"><h1>{article_title}</h1></div>
                <div className="post-link"><a href={article_link}>Read more.</a></div>
            </div>
        )
    };

    renderComments() {
        const comments = this.state.comments;
        return comments.map(comment => {
            return (<><div className="comment-show">
                <p className="comment-content">{comment.attributes.comment_text}</p>
                <h4 className="comment-user">Posted by: {comment.attributes.user.username}</h4>
                </div><br/></>)
        });
    };

    render() {
        const {loading} = this.state;
        const id = parseInt(this.props.match.params.id)
        const token = localStorage.getItem("token")
        return(
            <>
            { loading ? <Loader /> : this.renderBookmark() }
            {loading ? null : 
                <div className="post-comments">
                    <h2>Comments</h2>
                    {this.renderComments()}
                    {token ? <CommentForm bookmark={id} getDetails={() => this.getBookmarkDetails()} /> :
                        <p>Log in to comment.</p>
                    }
                </div>
            }
            </>
        );
    };
};

export default Bookmark;