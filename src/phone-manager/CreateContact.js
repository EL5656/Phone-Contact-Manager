// src/phone-manager/CreateContact.js
import React, { useContext } from 'react';
import FormField from '../components/FormField';
import { CRT_USR_CTC } from '../Constants';

const CreateContact = () => {
  const title = "Contact";

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mobile', label: 'Mobile', type: 'text', required: true },
  ];

  const getUserData = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user); // Parse the JSON string back to an object
    }
    return null;
  };

  const addContact = async (data) => {
    try {
      const user = getUserData(); 
      const response = await fetch(CRT_USR_CTC, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ ...data, user_id: user.id }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Validation Error: ' + error.message);
    }
  };

  return (
    <>
      <FormField
        title={title}
        fields={fields}
        onSubmit={addContact}
        onSuccess={(data) => { console.log('User created successfully!', data); }}
        onError={(err) => { console.error('Failed:', err); }}
        primaryBtnTxt="Save"
        primaryBtnClass="w-25 btn btn-primary"
      />
      {null}
    </>
  );
};

export default CreateContact;
