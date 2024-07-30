import React from "react";
import './App.css';
import PhoneContact from "./phone-manager/PhoneContact";
import ContactList from "./components/ContactList";
import SignUp from "./phone-manager/SignUp";
import Login from "./phone-manager/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const contacts = [
    { name: 'John Doe', email: 'john@example.com', mobile: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', mobile: '987-654-3210' },
    { name: 'Jane Smith', email: 'jane@example.com', mobile: '987-654-3210' },
  ];
  return (
    <div>
      {/* <ContactList contacts={contacts} /> */}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<PhoneContact />} />
      </Routes>


    </div>
  );
}

export default App;
