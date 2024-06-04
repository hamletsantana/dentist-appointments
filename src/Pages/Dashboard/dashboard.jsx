import "./dashboard.css";
import React, { useState, useEffect } from "react";
import Authenticate from "../../Components/Authenticator/authenticator";
import { useNavigate } from "react-router-dom";
import unibe from "../../Images/logo_unibe.png";
import { fetchUserAttributes } from "aws-amplify/auth";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const attributes = await fetchUserAttributes();
        setUserEmail(attributes.email);
        setFamilyName(attributes.family_name || ""); // Setting familyName if available
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, []);

  const handleClickTriaje = () => {
    navigate("/triaje");
  };

  const handleClickNoTriaje = () => {
    navigate("/cuestionario");
  };

  return (
    <section className="Dashboard">
      <div className="Nav">
        <img src={unibe} alt="UNIBE Logo" className="logo" />
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
            <Authenticate className="SignOutDashboard" />
          </div>
        </div>
      </div>

      <div className="Options">
        <button className="optionsButton button1" onClick={handleClickNoTriaje}>
          {" "}
          Realizar Triaje
        </button>
        <button className="optionsButton button2" onClick={handleClickTriaje}>
          {" "}
          Triaje Realizado
        </button>
      </div>
      <div className="CopyrightUnibe">
        <p>&copy; 2024 UNIBE School of Dentistry. All rights reserved.</p>
      </div>
    </section>
  );
}

export default Dashboard;
