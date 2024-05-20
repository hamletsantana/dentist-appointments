import "./triaje.css";
import React from "react";
import triaje from "../../Images/triaje_bg.jpg";
import NavBar from "../../Components/NavBar/navBar";

function Triaje() {
  return (
    <>
      <NavBar></NavBar>
      <img src={triaje} className="triaje_bg" />
    </>
  );
}

export default Triaje;
