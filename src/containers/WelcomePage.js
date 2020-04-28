import React from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp';

function WelcomePage(props){
    return(
        <div>
            <h1>Welcome {props.user.first_name}!</h1>
            <SignUp />
        </div>
    )
}

const mapStatetoProps = state => {
    return{
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);