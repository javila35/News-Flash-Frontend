import React, { Component } from 'react';
import { api } from '../services/';

/**
 * [ ] Refactor to Function component
 * [ ] Refactor to typescript
 * [ ] Type state and props?
 * [ ] Refactor to React-Query
 * [ ] Refactor to Material UI
 */
export class CommentForm extends Component {
    state = {
        comment_text: "",
        bookmark: this.props.bookmark
    };

    handleChange = e => {
        this.setState({
            comment_text: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { comment_text, bookmark } = this.state;
        const comment = {
            user_id: this.props.user_id,
            comment_text: comment_text,
            bookmark_id: bookmark
        };
        api.comments.postComment(comment).then(data => {
            this.props.getDetails()
            console.log(data)
        })
            ;
    }

    render() {
        return (
            <div className="comment-form">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="comment">Comment:</label>
                    <input type="text" onChange={this.handleChange} name="comment" placeholder="Enter comment."></input>
                    <input type="submit" value="Add Comment"></input>
                </form>
            </div>
        )
    };
};