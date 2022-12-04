import React, { useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import './UpdateProfile.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';


const UpdateProfile = ({ history }) => {
    const dispatch = useDispatch();

    /* Creating a reference to the alert function. */
        const alert = useAlert();
    
    let navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    

    const updateProfileSubmit = (e) => {
        /* The above code is preventing the default action of the event from
        occurring. */
              e.preventDefault();
        
        /* The above code is creating a new FormData object. */
              const myForm = new FormData();
        
             /* The above code is setting the name, email, password, and avatar properties
             of the myForm object to the values of the name, email, password, and avatar
             state objects. */
              myForm.set("name", name);
              myForm.set("email", email);
              myForm.set("avatar", avatar);
        
              dispatch(updateProfile(myForm));
            }
        
        
            const updateProfileDataChange = (e) => {
        /* The above code is creating a new FileReader object. */
                const reader = new FileReader();
        
                reader.onload = () => {
                    /* The above code is checking to see if the readyState property of the
                    reader object is equal to 2. If it is, then the avatarPreview state
                    object is
                    being set to the result property of the reader object and the avatar
                    state
                    object is being set to the result property of the reader object. */
                    if(reader.readyState === 2){
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                    }
                };
        
        /* The readAsDataURL() method is used to read the contents of the specified Blob or
        File. When the read operation is finished, the readyState becomes DONE, and the
        loadend is triggered. At that time, the result attribute contains the data as a
        data: URL representing the file's data as a base64 encoded string. */
                reader.readAsDataURL(e.target.files[0]);
            };
            
        
            useEffect(() => {
                
                if(user){
                    setName(user.name);
                    setEmail(user.email);
                    setAvatarPreview(user.avatar.url);
                }
                
                /* Checking to see if there is an error. If there is, then it is
                displaying the error message and then dispatching the clearErrors()
                action. */
                if(error){
                    alert.error(error);
                    dispatch(clearErrors())
                }
        
                if(isUpdated){
                    alert.success('Profile Updated Successfully.');
                    dispatch(loadUser());

                    navigate('/account');

                    dispatch({
                        type: UPDATE_PROFILE_RESET
                    })
                }
            }, [dispatch, error, alert, history, navigate, user, isUpdated]);
    
    
  return (
    <>
        {
            loading ? <Loader /> :
            <>
        <MetaData title="Update Profile" />
        
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
            <form 
                    className='updateProfileForm'
                    encType='multipart/form-data'
                    onSubmit={updateProfileSubmit}
                >
                <div className="updateProfileName">
                    <FaceIcon />
                    <input 
                        type="text" 
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>

                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input 
                        type="file" 
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                    />
                </div>

                <input 
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                />

                </form>
            </div>
        </div>
    </>
        }
    </>
  )
}

export default UpdateProfile