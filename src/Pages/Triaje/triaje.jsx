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
      <div className="CopyrightUnibeTriaje">
        <img src={unibe} alt="UNIBE Logo" className="logo_pequeño" />
        <p>
          <strong>
            &copy; 2024 Facultad de Odontología UNIBE. Reservados todos los
            derechos.
            <br></br>Desarrollado por{" "}
            <a
              className="LinkedIn"
              target="_blank"
              href="https://www.linkedin.com/in/brian-scannell-5880261ba/"
            >
              Brian Scannell,
            </a>{" "}
            Omar García y{" "}
            <a
              className="LinkedIn"
              target="_blank"
              href="https://www.linkedin.com/in/hamlet-santana-620b511b2/"
            >
              Hamlet Santana
            </a>
          </strong>
        </p>
      </div>
    </>
  );
}

export default Triaje;
