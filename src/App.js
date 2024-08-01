import React from "react";
import './App.css';
import PhoneContact from "./phone-manager/PhoneContact";
import SignUp from "./phone-manager/SignUp";
import Login from "./phone-manager/Login";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<PhoneContact />} />
      </Routes>
    </>
  );
}

export default App;
