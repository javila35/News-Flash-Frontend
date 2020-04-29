import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import UserProfile from './containers/UserProfile';
import WelcomePage from './containers/WelcomePage';
import Navigation from './components/Navigation';
import ArticleBrowser from './containers/ArticleBrowser';

function App() {
  return (
    <>
    <header className="title-bar"><h1>Headline</h1></header>
    <Provider store={store}>
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
        </div>
        </Switch>
      </Router>
    </Provider>
    </>
  );
}

export default App;
