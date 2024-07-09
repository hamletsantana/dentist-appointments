import "./homePage.css";
import unibe from "../../Images/logo_unibe.png";
import React from "react";
import Authenticate from "../../Components/Authenticator/authenticator";

function Home() {
  return (
    <>
      <section class="Authentication">
        <div class="row-intro">
          <div class="auth-intro left">
            <img src={unibe} class="logo_unibe" />
          </div>

          <div class="auth-intro right">
            <Authenticate></Authenticate>
          </div>
          <div className="CopyrightUnibeLogin">
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
        </div>
      </section>
    </>
  );
}

export default Home;
