import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCart.css'


const CartItemCart = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`} >{item.name}</Link>
        <span>{`Price: ৳${item.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCart