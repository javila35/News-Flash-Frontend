import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import WelcomePage from './containers/WelcomePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/">
            <WelcomePage />
          </Route>
          <Login />
          <Route 
            path="/users/:username"
            render={(props) => <UserProfile {...props} />} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
