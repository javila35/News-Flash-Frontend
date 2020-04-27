import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import UserProfile from './components/UserProfile';
import WelcomePage from './containers/WelcomePage';
import Navigation from './components/Navigation';
import ArticleBrowser from './components/ArticleBrowser';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Router>
        <div className="App">
          <Route exact path="/articles"
            render={() => <ArticleBrowser />}
          />
          <Route exact path="/"
            render={()=> <WelcomePage />} 
          />
          <Route 
            path="/users/:username"
            render={(props) => <UserProfile {...props} />} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
