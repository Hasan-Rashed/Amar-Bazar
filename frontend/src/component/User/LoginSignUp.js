import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import './LoginSignUp.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';


const LoginSignUp = ({ history }) => {

/* The above code is creating a reference to the dispatch function. */
    const dispatch = useDispatch();

/* Creating a reference to the alert function. */
    const alert = useAlert();

    let navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

/* The above code is creating a reference to the loginTab element. */
    const loginTab = useRef(null);
/* Creating a reference to the registerTab element. */
    const registerTab = useRef(null);
/* Creating a reference to the switcherTab element. */
    const switcherTab = useRef(null);


    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    /* Creating a state object called user and setting the initial values of the
    state object to the values that are passed in as the argument to the
    useState() function. */
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

/* Destructuring the user object. */
    const {name, email, password} = user;

/* Creating a state object called avatar and setting the initial value of the state
object to the value that is passed in as the argument to the useState()
function. */
    const [avatar, setAvatar] = useState();

    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    

    /**
     * It prevents the default action of the form from happening, and then
     * dispatches the login action with the email and password.
     * @param e - the event object
     */
    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword));
    };


    const registerSubmit = (e) => {
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
      myForm.set("password", password);
      myForm.set("avatar", avatar);

      dispatch(register(myForm));
    }


    const registerDataChange = (e) => {
      if(e.target.name === "avatar"){
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
      }
      else{
/* The above code is using the spread operator to create a new object that
contains all of the properties of the user object and then adding the property
that is being changed to the new object. */
/* The above code is using the spread operator to create a new object that
contains all of the properties of the user object and then adding the property
that is being changed to the new object. */
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    };
    

    useEffect(() => {
        /* Checking to see if there is an error. If there is, then it is
        displaying the error message and then dispatching the clearErrors()
        action. */
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isAuthenticated){
            // history.push('/account');
            navigate('/account');
        }
    }, [dispatch, error, alert, history, isAuthenticated, navigate]);
    

    /**
     * When the user clicks on the
     * register tab, the switcherTab element shifts to the right, the registerTab
     * element
     * shifts to the center, and the loginTab element shifts to the left.
     * @param e - The event object.
     * @param tab - This is the tab that the user wants to switch to.
     */
    const switchTabs = (e, tab) => {
      if(tab === 'login'){
        /* Adding the class shiftToNeutral to the switcherTab element and removing
        the class shiftToRight from the switcherTab element. */
        switcherTab.current.classList.add('shiftToNeutral');
        switcherTab.current.classList.remove('shiftToRight');

        /* Removing the class shiftToNeutralForm from the registerTab element and
        the class shiftToLeft from the loginTab element. */
        registerTab.current.classList.remove('shiftToNeutralForm');
        loginTab.current.classList.remove('shiftToLeft');
      }

      if(tab === 'register'){
        /* Adding the class shiftToRight to the switcherTab element and removing
        the class shiftToNeutral from the switcherTab element. */
        switcherTab.current.classList.add('shiftToRight');
        switcherTab.current.classList.remove('shiftToNeutral');

        /* Adding the class shiftToNeutralForm to the registerTab element and the
        class shiftToLeft to the loginTab element. */
        registerTab.current.classList.add('shiftToNeutralForm');
        loginTab.current.classList.add('shiftToLeft');
      }
    }
    
    
  return (
    <>
        {
            loading ? <Loader /> :
            <>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                    </div>
                    <button ref = {switcherTab}></button>
                </div>
                
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit} >
                    <div className="loginEmail">
                        <MailOutlineIcon />
                        <input 
                            type="email" 
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input 
                            type="password" 
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                    <Link to='/password/forgot' >Forgot Password?</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>

                <form 
                    className='signUpForm'
                    ref={registerTab}
                    encType='multipart/form-data'
                    onSubmit={registerSubmit}
                >
                <div className="signUpName">
                    <FaceIcon />
                    <input 
                        type="text" 
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                    />
                </div>

                <div className="signUpEmail">
                <MailOutlineIcon />
                <input 
                    type="email" 
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                />
                </div>

                <div className="signUpPassword">
                    <LockOpenIcon />
                    <input 
                        type="password" 
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                    />
                </div>

                <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input 
                        type="file" 
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                    />
                </div>

                <input 
                    type="submit"
                    value="Register"
                    className="signUpBtn"
                />

                </form>
                
            </div>
        </div>
    </>
        }
    </>
  )
}

export default LoginSignUp