import React from 'react';
import SignIn from '../../components/sign-in-form/sign-in-form.component.jsx';
import SignUp from '../../components/sign-up-form/sign-up-form.component.jsx';

import './authentication.styles.scss';

function Authentication() {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Authentication;
