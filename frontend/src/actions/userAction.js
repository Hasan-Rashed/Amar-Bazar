import { 
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

import axios from 'axios';


// Login
/**
 * We're dispatching an action to the reducer, which is then updating the state
 * @param email - The email address of the user.
 * @param password - The password of the user.
 */
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        /* Destructuring the data property from the response object. */
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        /* Dispatching an action to the reducer. */
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message})
    }
};


// Register User
/**
 * It takes in userData, dispatches a REGISTER_USER_REQUEST action, then makes a
 * post request to the backend, and if successful, dispatches a
 * REGISTER_USER_SUCCESS action, otherwise, it dispatches a REGISTER_USER_FAIL
 * action
 * @param userData - This is the data that we are sending to the server.
 */
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message});
    }
}



// Load User 
/**
 * We're dispatching an action to the reducer, which is then updating the state
 */
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });


        /* Destructuring the data property from the response object. */
        const { data } = await axios.get(`/api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error) {
        /* Dispatching an action to the reducer. */
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message})
    }
};



// Logout User 
/**
 * We're making a GET request to the /api/v1/logout endpoint, and if the request is
 * successful, we're dispatching an action to the reducer
 */
export const logout = () => async (dispatch) => {
    try {
        /* Destructuring the data property from the response object. */
        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS});
    } catch (error) {
        /* Dispatching an action to the reducer. */
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message})
    }
};


// Clearing errors
/**
 * It takes in a dispatch function as an argument, and then dispatches an action
 * object with a type of CLEAR_ERRORS
 */
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};