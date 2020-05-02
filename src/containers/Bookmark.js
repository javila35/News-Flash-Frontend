import React, { Component } from 'react';
import Comment from '../components/Comment';
import { api } from '../services/api';


// This component will show threaded comment and the bookmark.
// Currently not being used anywhere.
class Bookmark extends Component {
    state = {
        bookmark: {
            comments: []
        }
    };

    componentDidMount() {
        this.getBookmarkDetails()
    };

    getBookmarkDetails = () => {
        let id =this.props.match.params.id
        api.articles.getBookmark(id).then(data=>{
            console.log(data)
            // this.setState({})
        })
    };

    render() {
        return(
            <div id="discussion">
                <p>Lorem ipsum etc</p>
            </div>
        )
    }
};

export default Bookmark;