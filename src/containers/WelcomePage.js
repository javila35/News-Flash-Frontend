import React from 'react';
import { connect } from 'react-redux';
import { ArticleTicker } from '../components/welcomepage/ArticleTicker';

function WelcomePage(props) {
    return (
        <>
            <h1 className="welcome-title">Welcome {props.user.user.first_name}!</h1>
            <div id="ticker-div">
                <div className="ticker-box">
                    <h3 className="ticker-title">Recent Headlines</h3>
                    <ArticleTicker category="top articles" />
                </div>
                <div className="ticker-box">
                    <h3 className="ticker-title">Health</h3>
                    <ArticleTicker category="health" />
                </div>
                <div className="ticker-box">
                    <h3 className="ticker-title">Technology</h3>
                    <ArticleTicker category="technology" />
                </div>
            </div>
        </>
    )
}

const mapStatetoProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStatetoProps)(WelcomePage);