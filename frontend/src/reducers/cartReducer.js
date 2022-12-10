import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../constants/cartConstants';


/**
 * It checks if the item is already in the cart. If it is, it will update the
 * quantity of the item. If it isn't, it will add the item to the cart
 * @param [state] - The current state of the store.
 * @param action - This is the action that is dispatched from the component.
 * @returns The state is being returned.
 */

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => { 
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            /* Checking if the item is already in the cart. */
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
              );

            /* Checking if the item is already in the cart. If it is, it will
            update the quantity of the item. */
            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => 
                        i.product === isItemExist.product ? item : i
                    ),
                }

            }/* Adding the item to the cart. */
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            }


        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };
            
    
        /* Returning the state if the action type is not found. */
        default:
            return state;
    }
};
