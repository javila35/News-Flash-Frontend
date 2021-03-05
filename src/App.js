import React, { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { api } from './services/api';
import { connect } from 'react-redux';
import { getCurrentUser } from './redux'
import './App.css';
import UserProfile from './containers/UserProfile';
import WelcomePage from './containers/WelcomePage';
import Navigation from './components/Navigation';
import ArticleBrowser from './containers/ArticleBrowser';
import SignUp from './containers/SignUp';
import EditUser from './containers/EditUser';
import Bookmark from './containers/Bookmark';
import Search from './components/Search';
import UserBrowser from './containers/UserBrowser';

const queryClient = new QueryClient();

function App(props) {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      api.auth.getCurrentUser().then(data => {
        props.setCurrentUser(data);
      });
    };
  });

  const topHeadlines = 'top-news';
  const techHeadlines = 'topics/technology';
  const healthHeadlines = 'topics/health';
  const sports = 'topics/sports';
  const business = 'topics/business';

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header className="title-bar"><h1>News-Flash!</h1></header>
        <Router>
          <Navigation />
          <Switch>
            <div className="App">
              <Route exact path="/top_articles"
                render={() => <ArticleBrowser endpoint={topHeadlines} />} />
              <Route exact path="/sports_articles"
                render={() => <ArticleBrowser endpoint={sports} />} />
              <Route exact path="/business_articles"
                render={() => <ArticleBrowser endpoint={business} />} />
              <Route exact path="/"
                render={() => <WelcomePage />} />
              <Route exact path="/tech_articles"
                render={() => <ArticleBrowser endpoint={techHeadlines} />} />
              <Route exact path="/health_articles"
                render={() => <ArticleBrowser endpoint={healthHeadlines} />} />
              <Route path="/search/:query"
                render={props => <Search {...props} />} />
              <Route exact path="/users/:username"
                render={props => <UserProfile {...props} />} />
              <Route exact path="/bookmarks/:id"
                render={props => <Bookmark {...props} />} />
              <Route exact path="/sign-up/"
                render={props => <SignUp {...props} />} />
              <Route exact path="/users"
                render={props => <UserBrowser {...props} />} />
              <Route exact path="/edit-user"
                render={props => <EditUser {...props} />} />
            </div>
          </Switch>
        </Router>
      </QueryClientProvider>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: current_user => dispatch(getCurrentUser(current_user))
  };
};

export default connect(null, mapDispatchToProps)(App);
