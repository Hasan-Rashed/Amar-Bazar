import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants';




const ProductDetails = ({ match }) => {
    /* Destructuring the id from the useParams hook. */
    const { id } = useParams();

    /* A hook that allows us to dispatch actions to the redux store. */
    const dispatch = useDispatch();

    const alert = useAlert();


/* Destructuring the product, loading, and error from the state.productDetails. */
    const { product, loading, error } = useSelector(state => state.productDetails)

    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );

    /**
     * If the open variable is true, set it to false. If it's false, set it to true
     */
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };


    /**
     * The function is called when the user clicks the submit button on the review
     * form. It creates a new FormData object, sets the rating, comment, and
     * productId, and then dispatches the newReview action
     */
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    /* This is a hook that allows us to dispatch actions to the redux store. */
    useEffect(() => {
        /* Checking if there is an error in the review. If there is, it will
                display the error and clear the error. */
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        /* Checking if there is an error in the review. If there is, it will
        display the error and clear the error. */
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            alert.success('ReactStars Updated Successfully.');
            dispatch({ type: NEW_REVIEW_RESET })
        }
        
        /* Dispatching the action getProductDetails with the id of the product. */
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);



    
    
    
   /* This is the options for the react-stars component. */
    const options = {
        size: 'large',
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    };


    const [quantity, setQuantity] = useState(1);


  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

    /**
     * If the product's stock is less than or equal to the quantity, return.
     * Otherwise, set the quantity to the quantity plus one
     * @returns the value of the quantity variable.
     */
    const increaseQuantity = () => {
        if(product.stock <= quantity) return;
        
        const qty = quantity + 1;
        setQuantity(qty);
    };


    /**
     * If the quantity is less than or equal to 1, return. Otherwise, set the
     * quantity to the current quantity minus 1
     * @returns the value of the quantity variable.
     */
    const decreaseQuantity = () => {
        if(1 >= quantity) return;
        
        const qty = quantity - 1;
        setQuantity(qty);
    }


    /**
     * It dispatches an action to add items to the cart
     */
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Product added to cart");
    }

    
  return (
    <>
        { /* Checking if the loading is true, if it is, it will render the loader
        component. */
        loading ? <Loader /> : (
            <>
            <MetaData title = {`${product.name} -- AMAR-BAZAR`} />

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
                    <Rating {...options} />
                    <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                </div>

                <div className="detailsBlock-3">
                    <h1>&#2547;{`${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                        </div> 
                        <button onClick={addToCartHandler}>Add to Card</button>
                    </div>

                    <p>
                        Status: 
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                            {product.stock < 1 ? "Out of Stock" : "In Stock"};
                        </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            </div>
            
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>


        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        
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