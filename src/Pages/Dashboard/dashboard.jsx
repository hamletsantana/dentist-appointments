import "./dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import Authenticate from "../../Components/Authenticator/authenticator";
import { useNavigate, Link } from "react-router-dom";
import unibe from "../../Images/logo_unibe.png";
import { fetchUserAttributes } from "aws-amplify/auth";
import videoBg from "../../assets/denturesbg.mp4";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null); // Add ref for video element
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const attributes = await fetchUserAttributes();
        setUserEmail(attributes.email);
        setFamilyName(attributes.family_name || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Set playback rate to 0.5 (slower)
    }
  }, [isVideoLoaded]); // Run effect when video is loaded

  const handleClickTriaje = () => {
    navigate("/triaje");
  };

  const handleClickNoTriaje = () => {
    navigate("/cuestionario");
  };

  const handleClickBuscarPacientes = () => {
    navigate("/buscar-pacientes");
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className={`Dashboard ${isVideoLoaded ? "loaded" : ""}`}>
      <video
        ref={videoRef} // Add ref to video element
        src={videoBg}
        className="videoBg"
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoaded}
      ></video>
      <div className="Nav">
        <Link to="/inicio">
          <img src={unibe} alt="UNIBE Logo" className="logo" />
        </Link>
        <div className="userDetails">
          <div className="userGreetings">
            <div className="EmailName">
              {familyName && (
                <p className="userFamilyName">
                  <span className="welcomeText">Bienvenido</span>{" "}
                  {familyName.toUpperCase()}
                </p>
              )}
            </div>
            <button
              className="buttonBuscarPaciente"
              onClick={handleClickBuscarPacientes}
            >
              Buscar Paciente
            </button>
            <Authenticate className="SignOutDashboard" />
          </div>
        </div>
      </div>

      <div className="Options">
        <button className="optionsButton button1" onClick={handleClickNoTriaje}>
          Realizar Triaje
        </button>
        <button className="optionsButton button2" onClick={handleClickTriaje}>
          Triaje Realizado
        </button>
      </div>
      <div className="CopyrightUnibeHome">
        <p>
          <strong>
            &copy; 2024 Facultad de Odontología UNIBE. Reservados todos los
            derechos.
            <br></br>Desarrollado por{" "}
            <a
              className="LinkedInCopyRight"
              target="_blank"
              href="https://www.linkedin.com/in/brian-scannell-5880261ba/"
            >
              Brian Scannell,
            </a>{" "}
            Omar García y{" "}
            <a
              className="LinkedInCopyRight"
              target="_blank"
              href="https://www.linkedin.com/in/hamlet-santana-620b511b2/"
            >
              Hamlet Santana
            </a>
          </strong>
        </p>
      </div>
    </section>
  );
}

export default Dashboard;
