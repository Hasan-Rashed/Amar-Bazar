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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
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



// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
    }
}



// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
    }
}


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        /* Destructuring the data property from the response object. */
        const { data } = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
        /* Dispatching an action to the reducer. */
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message})
    }
};


// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        /* Destructuring the data property from the response object. */
        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        /* Dispatching an action to the reducer. */
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message})
    }
};



// get All Users
/**
 * It dispatches an action to the reducer to update the state of the application
 */
export const getAllUsers = () => async (dispatch) => {
    try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};



// get  User Details
/**
 * It dispatches an action to the reducer to update the state with the user details
 * @param id - The id of the user you want to get details for.
 */
export const getUserDetails = (id) => async (dispatch) => {
try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
} catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
}
};
  


// Update User
export const updateUser = (id, userData) => async (dispatch) => {
try {
    dispatch({ type: UPDATE_USER_REQUEST });

/* It's setting the content type to application/json. */
    const config = { headers: { "Content-Type": "application/json" } };

    /* It's destructuring the data property from the response object. */
    const { data } = await axios.put(
    `/api/v1/admin/user/${id}`,
    userData,
    config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
} catch (error) {
    dispatch({
    type: UPDATE_USER_FAIL,
    payload: error.response.data.message,
    });
}
};
 


// Delete User
export const deleteUser = (id) => async (dispatch) => {
try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
} catch (error) {
    dispatch({
    type: DELETE_USER_FAIL,
    payload: error.response.data.message,
    });
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