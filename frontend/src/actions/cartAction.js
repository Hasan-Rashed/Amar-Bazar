import { ADD_TO_CART } from '../constants/cartConstants';
import axios from 'axios';



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