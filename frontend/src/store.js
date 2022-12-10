/* Importing the createStore, combineReducers, and applyMiddleware functions from
the redux library. */
import { createStore, combineReducers, applyMiddleware } from 'redux';

/* importing the thunk middleware from the redux-thunk library. */
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { profileReducer, userReducer, forgotPasswordReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';



/* Creating a reducer that will be used to create the store. */
const reducer = combineReducers({
    /* Creating a key called products and assigning it to the productReducer. */
    products: productReducer,
    /* Creating a key called productDetails and assigning it to the
    productDetailsReducer. */
    productDetails: productDetailsReducer,
/* Creating a key called user and assigning it to the userReducer. */
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
});


/* Setting the initial state of the cart to the cartItems in localStorage. */
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
            shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
};

/* The above code is creating a middleware array that contains the thunk
middleware. */
const middleware = [thunk];

/* Creating a store that will hold the state of the application. */
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;