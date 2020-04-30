import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import { getCurrentUser } from '../redux'

class EditUser extends Component {
    state = {
        fields: {
            username: "",
            first_name: "",
            bio: "",
            twitter: "",
            website: "",
            location: ""
        }
    };

    componentDidMount() {
        const {username, first_name, bio, twitter, website, location, id} = this.props.user.user
        this.setState({
            fields: {
                id: id,
                username: username,
                first_name: first_name,
                bio: bio,
                twitter: twitter,
                website: website,
                location: location
            }
        })
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields })
    }

    handleSubmit = e => {
        e.preventDefault();
        api.users.editUser(this.state.fields).then(data=>{
            this.props.setCurrentUser(data)
            this.props.history.push(`/users/${this.state.fields.username}`);
        });
    }

    render() {
        const {username,first_name,bio,twitter,website,location} = this.state.fields;
        return(
            <div id="edit-user-form">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Username: </label>
                    <input type="text"
                        name="username"
                        onChange={this.handleChange}
                        placeholder=""
                        value={username}
                    /><br/>
                    <label>First Name: </label>
                    <input type="text"
                        name="first_name"
                        onChange={this.handleChange}
                        placeholder=""
                        value={first_name}
                    /><br/>
                    <label>Location: </label>
                    <input type="text"
                        name="location"
                        onChange={this.handleChange}
                        placeholder=""
                        value={location}
                    /><br/>
                    <label>Bio: </label>
                    <input type="textarea"
                        name="bio"
                        onChange={this.handleChange}
                        placeholder=""
                        value={bio}
                        style={{height: "3em"}}
                    /><br/>
                    <label>Twitter: </label>
                    <input type="text"
                        name="twitter"
                        onChange={this.handleChange}
                        placeholder=""
                        value={twitter}
                    /><br/>
                    <label>Website: </label>
                    <input type="text"
                        name="website"
                        onChange={this.handleChange}
                        placeholder=""
                        value={website}
                    /><br/>
                    <input type="submit" value="Edit account details" />
                </form>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {user: state.user};
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: current_user => dispatch(getCurrentUser(current_user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);