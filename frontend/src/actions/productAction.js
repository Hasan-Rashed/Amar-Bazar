import axios from 'axios';

import { 
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstants.js';



/**
 * The function is dispatching an action, getting the data from the server, and
 * then dispatching an action again
 */

export const getProduct = (keyword="", currentPage = 1, price = [0, 25000], category) => async (dispatch) => {
    
    try {
        
        /* Dispatching an action. */
        dispatch({
            /* A constant ALL_PRODUCT_REQUEST is being used to dispatch an action. */
            type: ALL_PRODUCT_REQUEST
        });

        /* Creating a link that is being used to get the data from the server. */
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        }

        /* Getting the data from the server. */
        const { data } = await axios.get(link);

        /* Dispatching an action. */
        dispatch({
            /* A constant ALL_PRODUCT_SUCCESS is being used to dispatch an action. */
            type: ALL_PRODUCT_SUCCESS,
            /* Sending the data to the reducer. */
            payload: data
        });

        
    } catch (error) {
        /* Dispatching an action. */
        dispatch({
            /* A constant ALL_PRODUCT_FAIL is being used to dispatch an action. */
            type: ALL_PRODUCT_FAIL,
            /* A function that is being called when the user clicks the submit button. It is
            taking the data from the form and sending it to the server. */
            payload: error.response.data.message
        });
    }
};




export const getProductDetails = (id) => async (dispatch) => {
    
    try {
        
        /* Dispatching an action. */
        dispatch({
            /* A constant PRODUCT_DETAILS_REQUEST is being used to dispatch an action. */
            type: PRODUCT_DETAILS_REQUEST
        });


        /* Getting the data from the server. */
        const { data } = await axios.get(`/api/v1/product/${id}`);

        /* Dispatching an action. */
        dispatch({
            /* A constant PRODUCT_DETAILS_SUCCESS is being used to dispatch an action. */
            type: PRODUCT_DETAILS_SUCCESS,
            /* Sending the data to the reducer. */
            payload: data.product
        });

        
    } catch (error) {
        /* Dispatching an action. */
        dispatch({
            /* A constant PRODUCT_DETAILS_FAIL is being used to dispatch an action. */
            type: PRODUCT_DETAILS_FAIL,
            /* A function that is being called when the user clicks the submit button. It is
            taking the data from the form and sending it to the server. */
            payload: error.response.data.message
        });
    }
};



/**
 * The function clearErrors() is an asynchronous function that dispatches an action
 * with a type of CLEAR_ERRORS
 */

// Clearing errors
export const clearErrors = () => async (dispatch) => {

    /* Dispatching an action. */
    dispatch({ 
        /* A constant CLEAR_ERRORS is being used to dispatch an action. */
        type: CLEAR_ERRORS
    });
}
