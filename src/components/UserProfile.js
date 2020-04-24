import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {

    editBio = () => {
        alert("Add bio to migration. Add a text box that let's a user edit their bio.")
    }

    showDetail = () => {
        const { username, first_name, location, twitter, website } = this.props.user;
        return(
            <>
                <h3>First Name: {first_name}</h3>
                <h4>Username: {username}</h4>
                <br/>
                <p>In: {location}</p>

                <p>About me: </p>
                <button onClick={this.editBio}>Edit!</button>

                <p>Social Media</p>
                {twitter === null ? null : <a href={`http://twitter.com/${twitter}`}>@{twitter}</a>}<br/>
                {website === null ? null : <a href={`${website}`}>{first_name}'s Website</a>}
            </>
        );
    };

    render() {
        return(
            <div className="user-show">
                {/* HOW DO I DO A SHOW PAGE FOR A USER. */}
                {/* THIS IS SEPARATE FROM STATE */}
                {localStorage.getItem("token") ? this.showDetail():null}
            </div>
        )
    }
};

const mapStateToProps = state =>{
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(UserProfile);