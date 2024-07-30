import React, { useState } from 'react';
import FormField from '../components/FormField';
import { useNavigate } from 'react-router-dom';
import { PMS_NEW_USR } from '../Constants';
import { Alert } from 'react-bootstrap';

const SignUp = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);

  const title = "Sign Up";
  const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mobile', label: 'Mobile', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true }
  ];

  const login = () => {
    navigateTo('/login');
  };

  const registerUser = async (data) => {
    const response = await fetch(PMS_NEW_USR, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('User already exist');
    }
    setSuccess(true);
    return await response.json();

  };

  const onSignUpSuccess = () => {
    if(success){
      return (
        <Alert variant="success">{`${title} successfully`}</Alert>
      );
    }
  };

  return (
    <>
      <FormField
        title={title}
        fields={fields}
        onSubmit={registerUser}
        onSuccess={(data) => { console.log('User signed up successfully!', data) }}
        onError={(err) => {
          console.error('Sign up error:', err);
        }}
        successMsg={onSignUpSuccess}
        primaryBtnTxt="Save"
        primaryBtnClass="w-25 btn btn-primary"
        primaryBtnClick
        textBtnText="Login"
        textBtnClick={login}
      />
    </>
  );
};

export default SignUp;
