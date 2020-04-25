import { CHANGE_NAVIGATION_SHOW } from './navTypes';

const initialState = {
    show: false
};

const navReducer = (state = initialState, action ) => {
    switch (action.type) {
        case CHANGE_NAVIGATION_SHOW:
            return {
                ...state,
                show: action.payload
            };
        default: 
            return state
        };
};

export default navReducer;