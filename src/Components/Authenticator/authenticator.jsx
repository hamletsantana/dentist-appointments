import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify/utils";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import "./authenticator.css";

import "@aws-amplify/ui-react/styles.css";

import { I18n } from "aws-amplify/utils";
import { translations } from "@aws-amplify/ui-react";
I18n.putVocabularies(translations);
I18n.setLanguage("es");

I18n.putVocabularies({
  es: {
    "Sign In": "Registrarse",
    "Sign Up": "Regístrate",
  },
});

I18n.putVocabulariesForLanguage("en", {
  "Reset your password": "Forgot your password?",
  "Enter your username": "Username or Email",
  "Send code": "Reset my password",
  "Back to Sign In": "Back to Login",
});
Amplify.configure(awsconfig);

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
    },
  },
  signUp: {
    family_name: {
      label: "Nombre Completo:",
      placeholder: "Inserte su nombre completo",
      isRequired: true,
      order: 1,
    },
    email: {
      label: "Email:",
      placeholder: "Inserte su email de la universidad",
      isRequired: true,
      order: 2,
    },
    password: {
      label: "Contraseña:",
      placeholder: "Inserte una contraseña",
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: "Confirmar Contraseña:",
      placeholder: "Confirme su contraseña",
      order: 4,
    },
  },
  signIn: {
    username: {
      label: "Email:",
      placeholder: "Inserte su email",
    },
    password: {
      label: "Contraseña:",
      placeholder: "Inserte su contraseña",
    },
  },
};

function Authenticate() {
  const navigate = useNavigate();

  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        navigate("/inicio");
        break;
      case "signedOut":
        navigate("/");
        break;
    }
  });

  return (
    <Authenticator formFields={formFields} SignIn={Authenticate}>
      {({ signOut }) => (
        <button onClick={signOut} className="signOutButton">
          Cerrar Sesión
        </button>
      )}
    </Authenticator>
  );
}

export default Authenticate;
