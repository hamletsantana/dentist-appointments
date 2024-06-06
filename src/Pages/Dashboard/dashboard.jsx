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
        <Link to="/home">
          <img src={unibe} alt="UNIBE Logo" className="logo" />
        </Link>
        <div className="userDetails">
          <div className="userGreetings">
            <div className="EmailName">
              {familyName && (
                <p className="userFamilyName">
                  <span className="welcomeText">Welcome</span>{" "}
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
            &copy; 2024 UNIBE School of Dentistry. All rights reserved.
          </strong>
        </p>
      </div>
    </section>
  );
}

export default Dashboard;
