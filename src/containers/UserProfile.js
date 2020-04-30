import React, { Component } from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import BookmarkCard from '../components/BookmarkCard';
import Comment from '../components/Comment';
import twitIcon from '../assets/twitIcon.png'

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
        // alert("Add a text box that let's a user edit their bio.")
        this.props.history.push('/edit-user');
    };

    getUserDetails = () => {
        api.users.getUserToDisplay(this.props.match.params.username).then(userData=>{
            console.log(userData);
            if (userData.errors) {
                this.setState({
                    errors: userData.errors
                },
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
        return comments.map((comment, index) => {
            return <Comment key={index} idProp={comment.id} comment={comment.attributes.comment}/>
        })
    }

    showDetail = (user) => {
        const { username, first_name, location, twitter, website, bio } = user;
        console.log(user)
        return(
            <div className="user-show">
                <h3>First Name: {first_name ? <>{first_name}</> : ""}</h3>
                <h3>Username: {username}</h3>
                <h5>Located In: {location ? <>{location}</> : "No location given"}</h5>
                <p>About me: {bio ? <>{bio}</> : "Enter some information about yourself!"}</p>
                {twitter || website ? <p>Social Media</p> : null}
                {twitter === null ? null : <><img src={twitIcon} className="twitIcon" alt="twitter icon"></img><a href={`http://twitter.com/${twitter}`}>@{twitter}</a></>}<br/>
                {website === null ? null : <a href={`${website}`}>{first_name}'s Website</a>}
                {this.props.user.user.username  === username ? <button onClick={this.editBio}>Edit!</button> : null}
            </div>
        );
    };

    render() {
        return(
            <div className="profile">
                {this.state.loading ? <Loader />:
                    <>
                    {this.showDetail(this.state.user.attributes)}
                    <div id="bookmark-title"><h1>Bookmarks</h1></div>
                    <div className="bookmark-browser">
                        {this.renderBookmarks()}
                    </div>
                    <div id="comments-title"><h1>Comments</h1></div>
                    <div className="comment-browser">
                        {this.renderComments()}
                    </div>
                    </>
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(UserProfile);