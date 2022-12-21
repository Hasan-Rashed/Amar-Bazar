import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/meabhisingh";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/df6tunnjb/image/upload/v1671595657/avatars/IMG_7544_ddicll.jpg"
              alt="Founder"
            />
            <Typography>Hasan Rashed</Typography>
            
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/@hasanrashed537"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;