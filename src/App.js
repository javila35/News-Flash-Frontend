import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';

// ATTENTION  
// REMOVE AFTER REDUX TEST
// FOR SOME REASON MY STORE ISN'T APPEARING
import CurrentUser from './components/CurrentUser';

function App() {
  return (
    <Provider store={store}>
      <div className="App">

        <Login />
        <CurrentUser />
      </div>
    </Provider>
  );
}

export default App;
