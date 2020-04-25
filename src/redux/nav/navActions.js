import { CHANGE_NAVIGATION_SHOW } from './navTypes';

export const changeNavigationShow = (boolean) => {
    return{
        type: CHANGE_NAVIGATION_SHOW,
        payload: boolean
    }
}
