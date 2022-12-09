import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants/cartConstants';
import axios from 'axios';



// Add to Cart
/**
 * We're making a request to the backend to get the product data, then we're
 * dispatching the action to the reducer, and finally we're saving the cartItems to
 * the localStorage
 * @param id - The id of the product.
 * @param quantity - The quantity of the product that the user wants to add to the
 * cart.
 */
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

        /* Destructuring the data from the response. */
        const { data } = await axios.get(`/api/v1/product/${id}`);

        /* Dispatching the action to the reducer. */
        dispatch({ 
            type: ADD_TO_CART,
            /* Destructuring the data from the response. */
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity
            }
        });


/* Saving the cartItems to the localStorage. */
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};



// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    });

    /* Saving the cartItems to the localStorage. */
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};