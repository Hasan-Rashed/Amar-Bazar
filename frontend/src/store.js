/* Importing the createStore, combineReducers, and applyMiddleware functions from
the redux library. */
import { createStore, combineReducers, applyMiddleware } from 'redux';

/* importing the thunk middleware from the redux-thunk library. */
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer } from './reducers/productReducer';



/* Creating a reducer that will be used to create the store. */
const reducer = combineReducers({
    /* Creating a key called products and assigning it to the productReducer. */
    products: productReducer
});


let initialState = {};

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