import React from 'react'
import './Cart.css';
import CardItemCard from './CartItemCart';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';




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
    
    
  return (
    <>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item, index) => (
                <div className="cartContainer" key={index} >
                <CardItemCard item={item} />
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
                    <p>{`৳690`}</p>
                </div>

                <div></div>
                <div className="checkOutBtn">
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart