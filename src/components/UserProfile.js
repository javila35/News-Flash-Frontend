import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import Loader from './Loader';

class UserProfile extends Component {
    state = {
        user: {},
        loading: true
    }

    componentDidMount(){
        this.getUserDetails();
    }

    editBio = () => {
        alert("Add bio to migration. Add a text box that let's a user edit their bio.")
    }

    getUserDetails = () => {
        api.users.getUserToDisplay(this.props.match.params.username).then(userData=>{
            this.setState({user:userData, loading: false});
        })
    }

    showDetail = (user) => {
        const { username, first_name, location, twitter, website, bio } = user;
        return(
            <>
                {first_name ? <h3>First Name: {first_name}</h3> : null}
                <h4>Username: {username}</h4>
                <br/>
                {location ? <p>In: {location}</p> : null}

                {bio ? <p>About me: {bio}</p> : null}
                <button onClick={this.editBio}>Edit!</button>

                {twitter || website ? <p>Social Media</p> : null}
                {twitter === null ? null : <a href={`http://twitter.com/${twitter}`}>@{twitter}</a>}<br/>
                {website === null ? null : <a href={`${website}`}>{first_name}'s Website</a>}
            </>
        );
    };

    render() {
        return(
            <div className="user-show">
                {this.state.loading ? <Loader />:this.showDetail(this.state.user)}
            </div>
        )
    }
};


// ATTENTION! 
// I don't think I need to map state to props for this view. It's just showing a user.
// I can add logic that says if current_user === user_profile then they can edit.
const mapStateToProps = state =>{
    return {
        current_user: state.user
    };
};

export default connect(mapStateToProps)(UserProfile);