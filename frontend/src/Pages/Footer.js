import React from "react";
import "./Footer.css";
import Typewriter from "typewriter-effect";
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo"></div>

        <p>Foxes Timereport </p>
      </div>
      <div className="footer-bottom">
          <span>
            <Typewriter
              options={{
                strings: ["Rasmus, Oliver, Pontus and Wilhelm."],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        <p> © 2022 Foxes. All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;
