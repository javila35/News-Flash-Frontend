import React from 'react';
import { ArticleTicker } from './ArticleTicker';

/**
 * TODO
 * [ ] Refactor to FC
 * [ ] Refactor to TS
 * [ ] Type state and props
 */
export const WelcomePage = ({ currentUser }) => {
    return (
        <>
            <h1 className="welcome-title">Welcome{currentUser ? ` ${currentUser.first_name}` : null}!</h1>
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
    );
}