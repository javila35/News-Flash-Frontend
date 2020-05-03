import React, { Component } from 'react';
import Comment from '../components/Comment';
import { api } from '../services/api';
import Loader from 'react-loading'


// This component will show threaded comment and the bookmark.
// Currently not being used anywhere.
class Bookmark extends Component {
    state = {
        bookmark: {},
        comments: [],
        loading: true
    };

    componentDidMount() {
        this.getBookmarkDetails();
    };

    getBookmarkDetails = () => {
        let id = this.props.match.params.id
        api.articles.getBookmark(id).then(data=>{
            console.log(data)
            if (data.error) {
                alert(data.error)
                this.props.history.push('/')
            } else {
                console.log(data)
                this.setState({
                    bookmark: data.data.attributes,
                    comments: [data.included],
                    loading: false
                })};
        });
    };

    renderBookmark() {
        const {article_img, article_link, article_title} = this.state.bookmark;
        return(
            <div id="bookmark-show">
                <h1>{article_title}</h1>
                <img src={article_img} alt={`${article_title} thumbnail`}></img>
                <a href={article_link}>Read more.</a>
            </div>
        )
    };

    render() {
        const {loading} = this.state.loading;
        return(
            <>
            {loading ? <Loader /> :
                this.renderBookmark()
            }
                <div id="discussion">
                    <p>Lorem ipsum etc</p>
                </div>
            </>
        )
    }
};

export default Bookmark;