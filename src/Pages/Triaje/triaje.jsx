import "./triaje.css";
import React from "react";
import triaje from "../../Images/triaje_bg.jpg";
import NavBar from "../../Components/NavBar/navBar";
import unibe from "../../Images/logo_unibe.png";

function Triaje() {
  return (
    <>
      <NavBar></NavBar>
      <img src={triaje} className="triaje_bg" />
      <div className="CopyrightUnibe">
        <img src={unibe} alt="UNIBE Logo" className="logo_pequeño" />
        <p>&copy; 2024 UNIBE School of Dentistry. All rights reserved.</p>
      </div>
    </>
  );
}

export default Triaje;
