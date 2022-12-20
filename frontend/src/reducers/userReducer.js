import { 
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,  
    REGISTER_USER_SUCCESS,  
    REGISTER_USER_FAIL, 
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants';


export const userReducer = (state = { user:{} }, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    switch(action.type){
        /* A reducer that is listening for the LOGIN_REQUEST action. When it
        receives the action, it will return a new state object with the loading
        property set to true and the isAuthenticated property set to false. */
        case LOGIN_REQUEST:
            case REGISTER_USER_REQUEST:
                case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };

        /* Returning a new state object with the loading property set to false, the
        isAuthenticated property set to true, and the user property set to the
        user object that was passed in the action payload. */
        case LOGIN_SUCCESS:
            case REGISTER_USER_SUCCESS:
                case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }

        case LOGIN_FAIL:
            case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };

            case LOAD_USER_FAIL: 
                return {
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }

            case LOGOUT_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }

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




export const profileReducer = (state = {  }, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    switch(action.type){
        /* A reducer that is listening for the LOGIN_REQUEST action. When it
        receives the action, it will return a new state object with the loading
        property set to true and the isAuthenticated property set to false. */
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
                case UPDATE_USER_REQUEST:
                    case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        /* Returning a new state object with the loading property set to false, the
        isAuthenticated property set to true, and the user property set to the
        user object that was passed in the action payload. */
        case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
                case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };

            case DELETE_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            isDeleted: action.payload.success,
            message: action.payload.message
        };

        case UPDATE_PROFILE_FAIL:
            case UPDATE_PASSWORD_FAIL:
                case UPDATE_USER_FAIL:
                    case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };


            case UPDATE_PROFILE_RESET:
                case UPDATE_PASSWORD_RESET:
                    case UPDATE_USER_RESET:
                return {
                    ...state,
                    isUpdated: false
                }
                case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

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




export const forgotPasswordReducer = (state = {}, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    switch(action.type){
        /* A reducer that is listening for the LOGIN_REQUEST action. When it
        receives the action, it will return a new state object with the loading
        property set to true and the isAuthenticated property set to false. */
            case FORGOT_PASSWORD_REQUEST:
                case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        /* Returning a new state object with the loading property set to false, the
        isAuthenticated property set to true, and the user property set to the
        user object that was passed in the action payload. */
            case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };

            case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };

            case FORGOT_PASSWORD_FAIL:
                case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
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




/**
 * A reducer function that returns a new state based on the action type
 * @param [state] - This is the current state of the application.
 * @param action - This is the action object that is dispatched from the action
 * creator.
 * @returns An object with two properties.
 */

 export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case ALL_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };





  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };