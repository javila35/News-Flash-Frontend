import React, { Component } from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';

class CommentForm extends Component {
    state = {
        comment_text: "",
        bookmark: this.props.bookmark
    };

    handleChange = e => {
        this.setState({
            comment_text: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        const { comment_text, bookmark } = this.state;
        const comment = {
            user_id: this.props.user_id,
            comment_text: comment_text, 
            bookmark_id: bookmark
        };
        api.comments.postComment(comment).then(data=>{
            this.props.getDetails()
            console.log(data)
        })
        ;
    }

    render() {
        return(
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

const mapStateToProps = state => {
    return {
        user_id: state.user.user.id
    }
};

export default connect(mapStateToProps)(CommentForm);