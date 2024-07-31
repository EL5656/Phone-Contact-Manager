import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <ContactCard key={contact._id} contact={contact} />
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
