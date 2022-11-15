import React, { useEffect } from 'react'
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useState } from 'react';


const Products = () => {
/* Importing the useDispatch hook from the react-redux library. */
    const dispatch = useDispatch();


    const [currentPage, setCurrentPage] = useState(1);

/* Destructuring the state.products object. */
    const { products, loading, error, productsCount, resultPerPage} = useSelector(state => state.products);

    /* Destructuring the keyword from the useParams hook. */
    const {keyword} = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    
    useEffect(() => {
/* Dispatching an action to the reducer. */
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);
    
    
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

                {
                    (
                        <div className="paginationBox">
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText='Next'
                        prevPageText='Prev'
                        firstPageText='1st'
                        lastPageText='Last'
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
                    )
                }
            </>
        }
    </>
  )
}

export default Products