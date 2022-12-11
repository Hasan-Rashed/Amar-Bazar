import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';


const ConfirmOrder = ({ history }) => {
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();

    /* Calculating the subtotal of the cart items. */
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price, 0
    );

/* A ternary operator. If subtotal is greater than 1000, then shipping charges will
be 0, otherwise it will be 200. */
    const shippingCharges = subtotal > 1000 ? 0 : 200;

/* Calculating the tax. */
    const tax = subtotal * 0.18;

/* Calculating the total price of the cart items. */
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        };

/* Storing the order information in the session storage. */
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        // navigate('/process/payment');
        navigate('/success');
    }
    
    
  return (
    <>
        <MetaData title='Confirm Order' />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmshippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>

                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems &&
                            cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`} >
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ৳{item.price} = {' '}
                                        <b>৳{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/*  */}

            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>৳{subtotal}</span>
                        </div>

                        <div>
                            <p>Shipping Charges:</p>
                            <span>৳{shippingCharges}</span>
                        </div>

                        <div>
                            <p>GST:</p>
                            <span>৳{tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total: </b>
                        </p>
                        <span>৳{totalPrice}</span>
                    </div>

                    {/* <button onClick={proceedToPayment}>Proceed To Payment</button> */}
                    <button onClick={proceedToPayment}>Cash On Delivery</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder