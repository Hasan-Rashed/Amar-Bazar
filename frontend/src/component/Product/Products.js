import React, { useEffect } from 'react'
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';


const Products = () => {
/* Importing the useDispatch hook from the react-redux library. */
    const dispatch = useDispatch();

/* Destructuring the state.products object. */
    const { products, loading, error, productsCount} = useSelector(state => state.products);

    /* Destructuring the keyword from the useParams hook. */
    const {keyword} = useParams();
    
    useEffect(() => {
/* Dispatching an action to the reducer. */
        dispatch(getProduct(keyword));
    }, [dispatch, keyword]);
    
    
  return (
    <>
        {
            loading ? <Loader /> : 
            <>
                <h2 className='productsHeading'>Products</h2>

                <div className="products">
                    {
                        products && 
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
            </>
        }
    </>
  )
}

export default Products