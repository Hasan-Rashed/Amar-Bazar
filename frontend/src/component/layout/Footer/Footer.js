import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile devices.</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
            <h1>Amar Bazar.</h1>
            <p>High Quality is our first priority.</p>

            <p>Copyright 2022 &copy; Hasan Rashed</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com/HasanRashed30/">Facebook</a>
            <a href="https://www.youtube.com/@hasanrashed537">Youtube</a>
            <a href="https://github.com/Hasan-Rashed">GitHub</a>
        </div>
    </footer>
  );
};

export default Footer