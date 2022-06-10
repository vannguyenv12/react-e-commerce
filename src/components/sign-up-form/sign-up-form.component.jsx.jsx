import React, { useContext, useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.util';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocFromAuth(user, { displayName });
    } catch (error) {
      console.log('register is failed!', error.message);
    }

    resetFormField();
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Create an account with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Create an account</Button>
      </form>
    </div>
  );
}

export default SignUp;
