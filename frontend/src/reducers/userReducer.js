import { 
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,  
    REGISTER_USER_SUCCESS,  
    REGISTER_USER_FAIL, 
    CLEAR_ERRORS
} from '../constants/userConstants';


export const userReducer = (state = { user:{} }, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    switch(action.type){
        /* A reducer that is listening for the LOGIN_REQUEST action. When it
        receives the action, it will return a new state object with the loading
        property set to true and the isAuthenticated property set to false. */
        case LOGIN_REQUEST:
            case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };

        /* Returning a new state object with the loading property set to false, the
        isAuthenticated property set to true, and the user property set to the
        user object that was passed in the action payload. */
        case LOGIN_SUCCESS:
            case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGIN_FAIL:
            case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };

            /* Clearing the error state. */
            case CLEAR_ERRORS:
                /* Returning an object with two properties. */
                return {
                    ...state, /* A spread operator. It is used to spread the properties of an object. */
                    error: null /* Setting the error state to null. */
                };

            /* Returning the default state. */
            default:
                return state;
    }
};