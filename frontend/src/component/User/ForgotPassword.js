import React, { useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import './ForgotPassword.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
// import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    /* Creating a reference to the alert function. */
    const alert = useAlert();
    
    // let navigate = useNavigate();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        /* The above code is preventing the default action of the event from
        occurring. */
              e.preventDefault();
        
        /* The above code is creating a new FormData object. */
              const myForm = new FormData();
        
             /* The above code is setting the name, email, password, and avatar properties
             of the myForm object to the values of the name, email, password, and avatar
             state objects. */
              myForm.set("email", email);
        
              dispatch(forgotPassword(myForm));
            }

            useEffect(() => {
                
                /* Checking to see if there is an error. If there is, then it is
                displaying the error message and then dispatching the clearErrors()
                action. */
                if(error){
                    alert.error(error);
                    dispatch(clearErrors())
                }
        
                if(message){
                    alert.success(message);
                }
            }, [dispatch, error, alert, message]);
    
  return (
    <>
        {
            loading ? <Loader /> :
            <>
        <MetaData title="Forgot Password" />
        
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>
            <form 
                    className='forgotPasswordForm'
                    onSubmit={forgotPasswordSubmit}
                >

                <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input 
                    type="email" 
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                </div>

                <input 
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                />

                </form>
            </div>
        </div>
    </>
        }
    </>
  )
}

export default ForgotPassword