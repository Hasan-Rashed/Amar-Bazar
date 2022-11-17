import React, { useEffect } from 'react'
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';



/* An array of categories. */
const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'Smartphones'
];


const Products = () => {
/* Importing the useDispatch hook from the react-redux library. */
    const dispatch = useDispatch();


       /* A hook that allows us to use state in a functional component. */
        const [currentPage, setCurrentPage] = useState(1);
        const [price, setPrice] = useState([0, 25000]);
        const [category, setCategory] = useState('');
    

/* Destructuring the state.products object. */
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.products);
// console.log('productsCount is: ', productsCount);
    /* Destructuring the keyword from the useParams hook. */
    const {keyword} = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    /**
     * It takes an event and a new price, and then sets the price to the new price
     * @param event - The event that triggered the function.
     * @param newPrice - The new price that the user has entered.
     */
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    
    useEffect(() => {
/* Dispatching an action to the reducer. */
        dispatch(getProduct(keyword, currentPage, price, category));
    }, [dispatch, keyword, currentPage, price, category]);


/* Setting the count variable to the filteredProductsCount. */
    let count = filteredProductsCount;
    
    
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

                
                <div className="filterBox">
                   {/* A slider that allows the user to filter the products by
                   price. */}
                    <Typography>Price</Typography>
                    <Slider  
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                    />

                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {
                            categories.map((category) => (
                                <li
                                    className = 'category-link'
                                    key = {category}
                                    onClick = {() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                

                { resultPerPage < count &&
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