import React, { useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import './UpdatePassword.css';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();

    /* Creating a reference to the alert function. */
        const alert = useAlert();
    
    let navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const updatePasswordSubmit = (e) => {
        /* The above code is preventing the default action of the event from
        occurring. */
              e.preventDefault();
        
        /* The above code is creating a new FormData object. */
              const myForm = new FormData();
        
             /* The above code is setting the name, email, password, and avatar properties
             of the myForm object to the values of the name, email, password, and avatar
             state objects. */
              myForm.set("oldPassword", oldPassword);
              myForm.set("newPassword", newPassword);
              myForm.set("confirmPassword", confirmPassword);
        
              dispatch(updatePassword(myForm));
            }
        
        
            useEffect(() => {
                
                /* Checking to see if there is an error. If there is, then it is
                displaying the error message and then dispatching the clearErrors()
                action. */
                if(error){
                    alert.error(error);
                    dispatch(clearErrors())
                }
        
                if(isUpdated){
                    alert.success('Profile Updated Successfully.');

                    navigate('/account');

                    dispatch({
                        type: UPDATE_PASSWORD_RESET
                    })
                }
            }, [dispatch, error, alert, history, navigate, isUpdated]);
    
    
    
  return (
    <>
        {
            loading ? <Loader /> :
            <>
        <MetaData title="Change Password" />
        
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>
            <form 
                    className='updatePasswordForm'
                    encType='multipart/form-data'
                    onSubmit={updatePasswordSubmit}
                >

                <div className="loginPassword">
                    <VpnKeyIcon />
                    <input 
                        type="password" 
                        placeholder="Old Password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className="loginPassword">
                    <LockOpenIcon />
                    <input 
                        type="password" 
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    value="Change"
                    className="updatePasswordBtn"
                />

                </form>
            </div>
        </div>
    </>
        }
    </>
  )
}

export default UpdatePassword