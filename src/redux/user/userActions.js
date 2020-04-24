import { GET_CURRENT_USER } from './userTypes';

export const getCurrentUser = (current_user) => {
    return {
        type: GET_CURRENT_USER,
        payload: current_user
    };
};