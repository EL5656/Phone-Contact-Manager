import React from "react";
import './App.css';
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

function App() {
  const contacts = [
    { name: 'John Doe', email: 'john@example.com', mobile: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', mobile: '987-654-3210' },
  ];
  return (
    <div>
      <Header />
      <AddContact />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
