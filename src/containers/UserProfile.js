import React, { Component } from 'react';
import { api } from '../services/api';
import Loader from '../components/Loader';
import BookmarkCard from '../components/BookmarkCard';
// import Discussion from './Discussion';
import Comment from '../components/Comment';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
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
            this.setState({user:userData, loading: false});
        });
    };

    renderBookmarks() {
        return this.state.user.bookmarks.map( (bookmark, index) => {
            return <BookmarkCard key={index} bookmark={bookmark}/>
        });
    };

    renderComments() {
        return this.state.user.discussions.map((comment, index) => {
            return <Comment key={index} comment={comment}/>
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
                    {this.showDetail(this.state.user)}
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