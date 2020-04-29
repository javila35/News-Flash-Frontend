import React, { Component } from 'react';
import { api } from '../services/api';
import Loader from '../components/Loader';
import BookmarkCard from '../components/BookmarkCard';
import Comment from '../components/Comment';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: false,
            user: {},
            userProps: null,
            loading: true
        };
    }

    componentDidMount(){
        this.getUserDetails();
    };

    editBio = () => {
        alert("Add a text box that let's a user edit their bio.")
    };

    getUserDetails = () => {
        api.users.getUserToDisplay(this.props.match.params.username).then(userData=>{
            if (userData.errors) {
                this.setState({
                    errors: userData.errors
                },
                // Redirect to home page if a user doesn't exist.
                ()=> { 
                    alert(this.state.errors);
                    this.props.history.push('/');
                }
            )} else {
                this.setState({
                    user: userData.data, 
                    userProps: userData.included,
                    loading: false
                });
            }
        });
    };

    renderBookmarks() {
        const bookmarks = this.state.userProps.filter(object => object.type === "bookmark")
        return bookmarks.map( (bookmark, index) => {
            return <BookmarkCard key={index} bookmark={bookmark.attributes}/>
        });
    };

    renderComments() {
        const comments = this.state.userProps.filter(object => object.type === "comment")
        console.log(comments)
        return comments.map((comment, index) => {
            return <Comment key={index} idProp={comment.id} comment={comment.attributes.comment}/>
        })
    }

    showDetail = (user) => {
        const { username, first_name, location, twitter, website, bio } = user;
        return(
            <div className="user-show">
                {first_name ? <h3>First Name: {first_name}</h3> : null}
                <h4>Username: {username}</h4>
                {location ? <p>In: {location}</p> : null}
                {bio ? <p>About me: {bio}</p> : null}
                {twitter || website ? <p>Social Media</p> : null}
                {twitter === null ? null : <a href={`http://twitter.com/${twitter}`}>@{twitter}</a>}<br/>
                {website === null ? null : <a href={`${website}`}>{first_name}'s Website</a>}
                {this.state.user.username === username ? <button onClick={this.editBio}>Edit!</button> : null}
            </div>
        );
    };

    render() {
        return(
            <>
                {this.state.loading ? <Loader />:
                    <>
                    {this.showDetail(this.state.user.attributes)}
                    <div className="bookmark-browser">
                        {this.renderBookmarks()}
                    </div>
                    <div className="bookmark-browser">
                        {this.renderComments()}
                    </div>
                    </>
                }
            </>
        )
    }
};

export default UserProfile;