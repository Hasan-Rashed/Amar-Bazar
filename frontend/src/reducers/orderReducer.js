import {
  ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS
} from "../constants/orderConstants";

/**
 * It takes in a state and an action and returns a new state based on the action
 * type
 * @param [state] - This is the current state of the reducer.
 * @param action - This is the action object that is dispatched from the
 * component.
 */
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    /* Returning a new state object with the loading property set to true. */
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    /* Returning a new state object with the loading property set to false and
    the order property set to the payload of the action. */
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    /* Returning a new state object with the loading property set to false and
    the error property set to the payload of the action. */
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    /* Clearing the error message. */
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
 * @param [state] - This is the initial state of the reducer.
 * @param action - This is the action object that is dispatched from the
 * component.
 */
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
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
 * It takes in a state and an action and returns a new state based on the action
 * type
 * @param [state] - This is the initial state of the reducer.
 * @param action - This is the action object that is dispatched from the
 * component.
 */
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ALL_ORDERS_FAIL:
      return {
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
 * @param action - This is the action object that is dispatched from the
 * component.
 */
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
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




/**
 * It takes in a state and an action and returns a new state based on the action
 * type
 * @param [state] - This is the initial state of the reducer.
 * @param action - This is the action object that is dispatched from the action
 * creator.
 */
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
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