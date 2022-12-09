import React from 'react'
import './Cart.css';
import CardItemCard from './CartItemCart';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';




const Cart = () => {
    const dispatch = useDispatch();

/* Destructuring the cartItems from the state.cart. */
    const { cartItems } = useSelector((state) => state.cart);
    

  /**
   * It takes in the id of the item, the quantity of the item, and the stock of the
   * item, and then it increases the quantity of the item by one, and then it
   * checks to see if the stock is less than or equal to the quantity, and if it
   * is, it returns nothing, and if it isn't, it dispatches the addItemsToCart
   * action with the id of the item and the new quantity of the item
   * @param id - the id of the product
   * @param quantity - the current quantity of the item in the cart
   * @param stock - The stock of the product
   * @returns the dispatch function.
   */
    const increaseQuantity = (id, quantity, stock)=> {
        const newQty = quantity + 1;

        if(stock <= quantity){
        return;
        }
        dispatch(addItemsToCart(id, newQty));
    }


    /**
     * It takes in an id and a quantity, then it creates a new quantity by
     * subtracting 1 from the quantity, then it checks to see if the new quantity
     * is less than or equal to 1, if it is, it returns nothing, if it isn't, it
     * dispatches an action to add the item to the cart with the new quantity
     * @param id - the id of the item
     * @param quantity - the current quantity of the item in the cart
     * @returns the dispatch function.
     */
    const decreaseQuantity = (id, quantity)=> {
    const newQty = quantity - 1;

    if(1 >= quantity){
        return;
    }
    dispatch(addItemsToCart(id, newQty));
    }


    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    
    
  return (
    <>

        {cartItems.length === 0 ? (
            <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <Typography>No items in your cart</Typography>
                <Link to="/products" >View Products</Link>
            </div>
        ) :
            <>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cartItems && cartItems.map((item, index) => (
                    <div className="cartContainer" key={index} >
                    <CardItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                        <button  onClick={() => decreaseQuantity(item.product, item.quantity) }>-</button>
                        <input type="number" readOnly value={item.quantity} />
                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock) }>+</button>
                    </div>

                    <p className="cartSubtotal">
                        {`৳${item.price * item.quantity}`}
                    </p>
                </div>
                ))}


                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        {/* Using the reduce method to get the total price of all the items in the cart. */}
                        <p>{`৳${cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}`}</p> {/* reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left-to-right) and the return value of the function is stored in an accumulator.*/}
                    </div>

                    <div></div>
                    <div className="checkOutBtn">
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </>
        }
    </>
  )
}

export default Cart