import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
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



function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser());
  }, []);

  
  return (
    <Router>
      <Header />

      { isAuthenticated && <UserOptions user={user} /> }
      
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/product/:id" element={ <ProductDetails />} />
        <Route exact path="/products" element={ <Products />} />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
