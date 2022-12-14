import axios from 'axios';

import { 
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants.js';



/**
 * The function is dispatching an action, getting the data from the server, and
 * then dispatching an action again
 */

export const getProduct = (keyword="", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    
    try {
        
        /* Dispatching an action. */
        dispatch({
            /* A constant ALL_PRODUCT_REQUEST is being used to dispatch an action. */
            type: ALL_PRODUCT_REQUEST
        });

        /* Creating a link that is being used to get the data from the server. */
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
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



// Get All Products For Admin
/**
 * It's a function that returns a function that takes in dispatch as a parameter
 */
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/products");
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  


  // Create Product
  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  
  


// Update Product
/**
 * It sends a PUT request to the server to update a product
 * @param id - The id of the product to be updated.
 * @param productData - This is the data that we want to update.
 */
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
  

// Delete Product
/**
 * It dispatches an action to the reducer, which then updates the state
 * @param id - The id of the product to be deleted.
 */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

/* Getting the data from the server. */
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
  

  // Get Product Details
/**
 * The function is getting the product details from the server and sending it to
 * the reducer
 * @param id - The id of the product.
 */
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




// NEW REVIEW
/**
 * It takes in a reviewData object, and then dispatches a NEW_REVIEW_REQUEST
 * action, which is then followed by a NEW_REVIEW_SUCCESS action if the request is
 * successful, or a NEW_REVIEW_FAIL action if the request fails
 * @param reviewData - This is the data that will be sent to the server.
 */
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  




// Get All Reviews of a Product
/**
 * It dispatches an action to the reducer to update the state with the reviews of a
 * particular product
 * @param id - The id of the product we want to get all reviews for.
 */
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

  



// Delete Review of a Product
/**
 * It dispatches an action to delete a review from the database
 * @param reviewId - The id of the review to be deleted
 * @param productId - The id of the product that the review is being added to.
 */
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
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
