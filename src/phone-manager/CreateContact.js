import React, { useState } from 'react';
import FormField from '../components/FormField';
import { PMS_NEW_USR } from '../Constants';

const CreateContact = () => {
  const title = "Create Contact";
  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mobile', label: 'Mobile', type: 'text', required: true },
  ];

  const addContact = async (data) => {
    try {
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
        onSuccess={(data)=>{console.log('User created successfully!', data)}}
        onError={(err) => {
          console.error('Failed:', err);
        }}
        primaryBtnTxt="Save"
        primaryBtnClass="w-25 btn btn-primary"
        primaryBtnClick
      />
    </>
  );
};

export default CreateContact;
