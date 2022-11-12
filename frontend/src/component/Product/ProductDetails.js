import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';

const ProductDetails = ({ match }) => {
    /* Destructuring the id from the useParams hook. */
    const { id } = useParams();

    /* A hook that allows us to dispatch actions to the redux store. */
    const dispatch = useDispatch();

    const alert = useAlert();


/* Destructuring the product, loading, and error from the state.productDetails. */
    const { product, loading, error } = useSelector(state => state.productDetails)

    /* This is a hook that allows us to dispatch actions to the redux store. */
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        /* Dispatching the action getProductDetails with the id of the product. */
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);


   /* This is the options for the react-stars component. */
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    };

    
  return (
    <>
        { loading ? <Loader /> : (
            <>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {
                        product.images &&
                        product.images.map((item, i) => (
                            <img className='CarouselImage'
                                key = { item.url }
                                src = { item.url }
                                alt = { `${i} Slide` }
                            />
                        ))
                    }
                </Carousel>
            </div>


            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>

                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>

                <div className="detailsBlock-3">
                    <h1>&#2547;{`${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input value="1" type="number" />
                            <button>+</button>
                        </div> 
                        <button>Add to Card</button>
                    </div>

                    <p>
                        Status: 
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "Out of Stock" : "In Stock"};
                        </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>

                <button className='submitReview'>Submit Review</button>
            </div>
            
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>
        {
            product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {
                        product.reviews &&
                        product.reviews.map((review, index) => <ReviewCard review={review} key={index} />)
                    }
                </div>
            ) : (
                <p className='noReviews'>No Reviews Yet</p>
            )
        }
    </>
        )}
    </>
  )
}

export default ProductDetails