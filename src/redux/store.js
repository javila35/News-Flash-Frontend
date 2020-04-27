import { createStore, combineReducers } from 'redux';
import userReducer from './user/userReducer';
import navReducer from './nav/navReducer';

let rootReducer = combineReducers({user: userReducer, nav: navReducer})
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;