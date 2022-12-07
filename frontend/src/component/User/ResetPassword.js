import React, { useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import './ResetPassword.css';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { useParams } from 'react-router-dom';




const ResetPassword = ({ history, match }) => {
/* Creating a reference to the dispatch function. */
    const dispatch = useDispatch();

    /* Creating a reference to the alert function. */
        const alert = useAlert();
    
/* Creating a reference to the useNavigate() hook. */
    let navigate = useNavigate();

/* Destructuring the token property from the useParams() hook. */
    const { token } = useParams();

/* Destructuring the error, success, and loading properties from the
state.forgotPassword object. */
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const resetPasswordSubmit = (e) => {
        /* The above code is preventing the default action of the event from
        occurring. */
              e.preventDefault();
        
        /* The above code is creating a new FormData object. */
              const myForm = new FormData();
        
             /* The above code is setting the name, email, password, and avatar properties
             of the myForm object to the values of the name, email, password, and avatar
             state objects. */
              myForm.set("password", password);
              myForm.set("confirmPassword", confirmPassword);
        
              dispatch(resetPassword(token, myForm));
            }
        
        
            useEffect(() => {
                
                /* Checking to see if there is an error. If there is, then it is
                displaying the error message and then dispatching the clearErrors()
                action. */
                if(error){
                    alert.error(error);
                    dispatch(clearErrors())
                }
        
                if(success){
                    alert.success('Password Updated Successfully.');

                    navigate('/login');
                }
            }, [dispatch, error, alert, history, navigate, success]);
    
    
    
  return (
    <>
        {
            loading ? <Loader /> :
            <>
        <MetaData title="Change Password" />
        
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>
            <form 
                    className='resetPasswordForm'
                    onSubmit={resetPasswordSubmit}
                >

                <div>
                    <LockOpenIcon />
                    <input 
                        type="password" 
                        placeholder="New Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="loginPassword">
                    <LockIcon />
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                />

                </form>
            </div>
        </div>
    </>
        }
    </>
  )
}

export default ResetPassword