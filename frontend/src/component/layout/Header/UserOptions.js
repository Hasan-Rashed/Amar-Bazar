import React, {useState} from 'react'
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {logout} from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';


const UserOptions = ({ user }) => {

/* Destructuring the cartItems from the state.cart. */
    const  { cartItems } = useSelector((state) => state.cart);
    
    /* Creating a state variable called open and setting it to false. */
    const [open, setOpen] = useState(false);

    let navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    /* Creating an array of objects. Each object has a key of icon, name, and func. */
    const options = [
        {icon: <ListAltIcon />, name: 'Orders', func: orders },
        {icon: <PersonIcon />, name: 'Profile', func: account },
        {icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        {icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ];

    /* Adding a new option to the options array. */
    if(user.role === 'admin'){
        options.unshift({
            icon: <DashboardIcon />, 
            name: 'dashboard', 
            func: dashboard
        });
    };

    /**
     * It navigates to the dashboard page.
     */
    function dashboard(){
        navigate('/dashboard');
    }

    /**
     * The function orders() is called when the user clicks on the "Orders" button
     */
    function orders(){
        navigate('/orders');
    }

    /**
     * It navigates to the account page
     */
    function account(){
        navigate('/account');
    }

    /**
     * It navigates to the cart page.
     */
    function cart(){
        navigate('/cart');
    }

    /**
     * It logs out the user.
     */
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }
    
    
  return (
    <>
        <Backdrop open={open} style={{ zIndex: "10"}} />
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{zIndex: "11"}}
            open={open}
            direction="down"
            className="speedDial"
            icon={
                <img 
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : '/Profile.png'} 
                    alt="Profile" 
                />
            }
        >
        {options.map((item) => (
            <SpeedDialAction 
                key={item.name}
                icon={item.icon} 
                tooltipTitle={item.name} 
                onClick={item.func} 
                tooltipOpen={window.innerWidth <= 600 ? true : false }
            />
        ))}
        </SpeedDial>
    </>
  )
}

export default UserOptions