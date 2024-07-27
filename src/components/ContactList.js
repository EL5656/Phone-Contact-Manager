import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                {contacts.length > 0 ? (
                    contacts.map((contact, index) => (
                        <ContactCard key={index} contact={contact} />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No contacts found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
