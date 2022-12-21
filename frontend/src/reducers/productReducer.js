import { 
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
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
 * It returns an object with two properties, loading and product. The loading
 * property is set to true and the product property is set to an empty array.
 * @param [state] - The state of the reducer.
 * @param action - The action object.
 * @returns An object with two properties.
 */

export const productsReducer = (state = { products: [] }, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    
    /* A switch statement. It is used to execute a block of code depending on
    different cases. */
    switch (action.type) {
        /* Setting the loading state to true and setting the product state to an
        empty array. */
        case ALL_PRODUCT_REQUEST:
          case ADMIN_PRODUCT_REQUEST:
            
            /* Returning an object with two properties. */
            return {
                loading: true, /* Setting the loading state to true. */
                products: [] /* Setting the product state to an empty array. */
            };

        /* Setting the loading state to false and setting the product state to the
        products array. */
        case ALL_PRODUCT_SUCCESS:
            
           /* Returning an object with three properties. */
            return {
                loading: false, /* Setting the loading state to false. */
                products: action.payload.products, /* Setting the product state to the products array. */
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };

            case ADMIN_PRODUCT_SUCCESS:
              return {
                loading: false,
                products: action.payload
              }
            

        /* Setting the loading state to false and setting the error state to the
        error message. */
        case ALL_PRODUCT_FAIL:
          case ADMIN_PRODUCT_FAIL:
            
            /* Returning an object with two properties. */
            return {
                loading: false, /* Setting the loading state to false. */
                error: action.payload /* Setting the error state to the error message. */
            };

        case CLEAR_ERRORS:
            
            /* Returning an object with two properties. */
            return {
                ...state, /* A spread operator. It is used to spread the properties of an object. */
                error: null /* Setting the error state to null. */
            };
    
        /* Returning the state if the action type is not one of the three action
        types. */
        default:
            return state;
    }
};



export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
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





/**
 * It returns a new state object based on the action type
 * @param [state] - This is the current state of the reducer.
 * @param action - This is the action object that is dispatched from the component.
 * @returns The productReducer is being returned.
 */
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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




/**
 * It returns an object with two properties, loading and product. The loading
 * property is set to true and the product property is set to an empty object
 * @param [state] - The state of the reducer.
 * @param action - The action object.
 * @returns An object with two properties.
 */
export const productDetailsReducer = (state = { product: {} }, action) => { /* Setting the default state to an object with a property called products and setting the value of the property to an empty array. */
    
    /* A switch statement. It is used to execute a block of code depending on
    different cases. */
    switch (action.type) {
        
        /* Setting the loading state to true and returning the state. */
        case PRODUCT_DETAILS_REQUEST:
            
            /* Returning an object with two properties. */
            return {
                loading: true, /* Setting the loading state to true. */
                ...state /* A spread operator. It is used to spread the properties of an object. */
            };

        /* Setting the loading state to false and setting the product state to the
        product object. */
        case PRODUCT_DETAILS_SUCCESS:
            
           /* Returning an object with two properties. */
            return {
                loading: false, /* Setting the loading state to false. */
                product: action.payload, /* Setting the product state to the products array. */
            };

        /* Setting the loading state to false and setting the error state to the
        error message. */
        case PRODUCT_DETAILS_FAIL:
            
            /* Returning an object with two properties. */
            return {
                loading: false, /* Setting the loading state to false. */
                error: action.payload /* Setting the error state to the error message. */
            };

        case CLEAR_ERRORS:
            
            /* Returning an object with two properties. */
            return {
                ...state, /* A spread operator. It is used to spread the properties of an object. */
                error: null /* Setting the error state to null. */
            };
    
        /* Returning the state if the action type is not one of the three action
        types. */
        default:
            return state;
    }
};




// New Product Reducer
/**
 * It takes in a state and an action, and returns a new state based on the action
 * @param [state] - This is the initial state of the reducer.
 * @param action - This is the action that is dispatched from the component.
 */



export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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




/**
 * It takes in a state and an action and returns a new state
 * @param [state] - This is the initial state of the reducer.
 * @param action - This is the action object that was dispatched.
 */

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
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

  



/**
 * It returns a new state object based on the action type
 * @param [state] - This is the current state of the reducer.
 * @param action - This is the action object that is dispatched from the component.
 * @returns The reducer is returning the state of the application.
 */
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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