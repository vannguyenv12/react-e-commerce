import React, { useState, useContext } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.util';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        alert('email or password is incorrect');
        return;
      }
      console.log('login is failed!', error.message);
    }

    resetFormField();
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Create an account with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
