import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,

    GET_USER,

    UPDATE_PROFILE,

    ADD_TO_READING_LIST,
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                 ...state, 
                register: action.payload 
            }
        case LOGIN_USER:
            return { 
                ...state, 
                loginSucces: action.payload 
            }
        case AUTH_USER:
            return { 
                ...state, 
                userData: action.payload 
            }
        case LOGOUT_USER:
            return { 
                ...state 
            }
        case GET_USER:
            return {
                ...state,
                userData: action.payload
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                userData: {
                    ...state.userDate,
                    profile: action.payload
                }
            }
        case ADD_TO_READING_LIST:
            return {
                ...state,
                userData: {
                    ...state.userDate,
                    readinglist : action.payload
                }
            }
        default:
            return state;
    }
}

