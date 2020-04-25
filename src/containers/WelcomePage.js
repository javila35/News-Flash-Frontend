import React from 'react';
import { connect } from 'react-redux';

function WelcomePage(props){
    return(
        <div>
            <h1>Welcome {props.user.first_name}!</h1>
        </div>
    )
}

const mapStatetoProps = state => {
    return{
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);