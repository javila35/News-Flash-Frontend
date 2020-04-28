import { GET_CURRENT_USER, REMOVE_CURRENT_USER } from './userTypes';

const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        case REMOVE_CURRENT_USER:
            return {
                ...state,
                user: {}
            };
        default:
            return state;
    };
};

export default userReducer;