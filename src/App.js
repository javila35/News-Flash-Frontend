import React, { useEffect } from 'react';
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

function App(props) {
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if (token) {
      api.auth.getCurrentUser().then(data=>{
        console.log(data)
        props.setCurrentUser(data)
      })
    }
  })
  return (
    <>
    <header className="title-bar"><h1>Headline</h1></header>
      <Router>
      <Navigation />
      <Switch>
        <div className="App">
          <Route exact path="/articles"
            render={() => <ArticleBrowser />}
          />
          <Route exact path="/"
            render={()=> <WelcomePage />} 
          />
          <Route 
            exact path="/users/:username"
            render={(props) => <UserProfile {...props} />} />
          <Route
            exact path="/sign-up/"
            render={() => <SignUp />}
          />
          <Route
            exact path="/edit-user"
            render={props => <EditUser {...props} />} />
        </div>
        </Switch>
      </Router>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: current_user => dispatch(getCurrentUser(current_user))
  };
};

export default connect(null,mapDispatchToProps)(App);
