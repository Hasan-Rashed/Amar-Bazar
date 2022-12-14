import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions'
import Profile from "./component/User/Profile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from './component/layout/NotFound/NotFound';




function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

/* Preventing the right click on the page. */
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  
  return (
    <Router>
      <Header />

      { isAuthenticated && <UserOptions user={user} /> }
      
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/product/:id" element={ <ProductDetails />} />
        <Route exact path="/products" element={ <Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/*" element={<NotFound />} />
        <Route path="/products/:keyword" element={ <Products />} />

        <Route exact path="/search" element={ <Search />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

    <Route exact path="/password/forgot" element={ <ForgotPassword />} />

    <Route exact path="/password/reset/:token" element={ <ResetPassword />} />
          

        <Route exact path="/login" element={ <LoginSignUp /> } />

        <Route exact path="/cart" element={ <Cart /> } />


        <Route
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />


        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/process/payment"
          element={
          <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </ProtectedRoute>
          </Elements>
          }
        />
        

        <Route
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderList />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
