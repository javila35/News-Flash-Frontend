import React from 'react';
import { connect } from 'react-redux';

function WelcomePage(props){
    return(
        <>
            <h1 className="welcome-title">Welcome {props.user.user.first_name}!</h1>
            {/* {token ? null : <span>"It looks like you aren't signed in." <br/> "Create an Account?"</span>} */}
        </>
    )
}

const mapStatetoProps = state => {
    return{
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);