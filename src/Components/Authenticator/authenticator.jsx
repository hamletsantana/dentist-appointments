import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import {Hub} from 'aws-amplify/utils';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import './authenticator.css';

import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsconfig);

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    family_name: {
      label: 'Family Name:',
      placeholder: 'Enter your name',
      isRequired: false,
      order: 1,
    },
    email: {
      label: 'Email:',
      placeholder: 'Enter your email',
      isRequired: false,
      order: 2,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password',
      isRequired: false,
      order: 3,
    },
  },
};

function Authenticate() {
  const navigate = useNavigate();

  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
        navigate("/dashboard");
        break;
      case 'signedOut':
        navigate("/");
        break;
    }
  });
  
  return (
    <Authenticator formFields={formFields} SignIn={Authenticate}>
      {({ signOut }) => <button onClick={signOut} className="signOutButton">Sign out</button>}
    </Authenticator>
  );
}

export default Authenticate;
