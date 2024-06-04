import "./homePage.css";
import unibe from "../../Images/logo_unibe.png";
import React from "react";
import Authenticate from "../../Components/Authenticator/authenticator";

function Home() {
  return (
    <section class="Authentication">
      <div class="row-intro">
        <div class="auth-intro left">
          <img src={unibe} class="logo_unibe" />
        </div>
        <div class="auth-intro right">
          <Authenticate></Authenticate>
        </div>
      </div>
    </section>
  );
}

export default Home;
