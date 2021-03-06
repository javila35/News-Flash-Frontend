import React, { Component } from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';
import { removeCurrentUser } from '../redux'
import Loader from '../components/Loader';
import BookmarkCard from '../components/BookmarkCard';

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

    componentDidUpdate(){
        this.getUserDetails()
    };

    editBio = () => {
        this.props.history.push('/edit-user');
    };

    deleteUser = () => {
        api.users.deleteUser(this.props.user.user.id).then(()=>{
            localStorage.removeItem("token");
            this.props.history.push('/');
            this.props.removeCurrentUser();
        })
    };

    getUserDetails = () => {
        api.users.getUserToDisplay(this.props.match.params.username).then(userData=>{
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
            return <BookmarkCard key={index} bookmark={bookmark.attributes} bmID={bookmark.id} handleClick={this.showBookmark} />
        });
    };

    showBookmark = (bookmark_id) => {
        this.props.history.push(`/bookmarks/${bookmark_id}`);
    };

    showDetail = (user) => {
        const { username, first_name, location, bio } = user;
        return(
            <div className="user-show">
                <h3>First Name: {first_name ? <>{first_name}</> : ""}</h3>
                <h3>Username: {username}</h3>
                <h5>Located In: {location ? <>{location}</> : "No location given"}</h5>
                <h5>About me: {bio ? <>{bio}</> : "Enter some information about yourself!"}</h5>
                {this.props.user.user.username  === username ? <><button onClick={this.editBio}>Edit account details.</button><button onClick={this.deleteUser}>Delete my account.</button></> : null}
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

const mapDispatchToProps = dispatch => {
    return {
        removeCurrentUser: () => dispatch(removeCurrentUser())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);