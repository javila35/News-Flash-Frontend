import React from 'react';
import { connect } from 'react-redux';
import ArticleTicker from '../components/welcomepage/ArticleTicker';

function WelcomePage(props){
    return(
        <>
            <h1 className="welcome-title">Welcome {props.user.user.first_name}!</h1>
            <div id="ticker-box">
            <ArticleTicker category="top articles" />
            </div>
        </>
    )
}

const mapStatetoProps = state => {
    return{
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);