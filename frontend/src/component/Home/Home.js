import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { CgMouse } from 'react-icons/cg';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './Home.css';
import ProductCard from './ProductCard';

/* Importing the getProduct function from the productAction.js file. */
import { clearErrors, getProduct } from '../../actions/productAction';

/* to working with redux Importing the useSelector and useDispatch hooks from the react-redux library. */
import { useDispatch, useSelector } from 'react-redux'; // to access backend data from redux store using useSelector




const Home = () => {
    const alert = useAlert();

    /* Importing the useDispatch hook from the react-redux library. */
    const dispatch = useDispatch();


    /* Destructuring the state.products object for showing in the frontend */
    const { loading, error, products } = useSelector((state) => state.products);

    /* A hook that is used to fetch data from the backend. */
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        /* Calling the getProduct function from the productAction.js file. */
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {
                loading ? (<Loader />)
                    : (
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

                                {/* using parenthesis instead of curly braces is mandatory */}
                                {/* Checking if the products array is not empty then it will map through
            the products array and pass each product object to the Product
            component. */}
                                {products && products.map((product, index) => (
                                    /* Passing the product object to the Product component. */
                                    <ProductCard key={index} product={product} />
                                ))}

                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    )
}

export default Home