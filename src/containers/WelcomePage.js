import React from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp';

function WelcomePage(props){
    const token = localStorage.getItem("token");
    return(
        <>
            <h1>Welcome {props.user.first_name}!</h1>
            {token ? null : 
            <div className="welcome-signup-form">
                <SignUp />
            </div>
            }   
        </>
    )
}

const mapStatetoProps = state => {
    return{
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);