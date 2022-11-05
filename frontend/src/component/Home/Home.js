import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData';

/* Importing the getProduct function from the productAction.js file. */
import { getProduct } from '../../actions/productAction';

/* to working with redux Importing the useSelector and useDispatch hooks from the react-redux library. */
import { useSelector, useDispatch } from 'react-redux';



const product = {
    name: 'Blue T-shirt',
    images: [{url: 'https://i.ibb.co/DRST11n/1.webp'}],
    price: '$24',
    _id: 'tShirtId',
}


const Home = () => {
    
/* Importing the useDispatch hook from the react-redux library. */
    const dispatch = useDispatch();

    /* A hook that is used to fetch data from the backend. */
    useEffect(() => {
        /* Calling the getProduct function from the productAction.js file. */
        dispatch(getProduct());
    }, [dispatch]);
    
  return (
    <Fragment>

        {/* A component that is used to set the title of the page. */}
        <MetaData title='AMAR BAZAR' />
        
        <div className="banner">
            <h2>Welcome to Amar Bazar</h2>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll <CgMouse />
                </button>
            </a>    
        </div>

        <h2 className='homeHeading'>Featured Products</h2>

        <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
        </div>
    </Fragment>
  )
}

export default Home