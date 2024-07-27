import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import icons from react-icons

const ContactList = ({ contacts }) => {
    const greyStyle = { color: 'grey' };
    return (
        <div className="container mt-5">
            <div className="row">
                {contacts.length > 0 ? (
                    contacts.map((contact, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{contact.name}</h4>
                                    <p className="card-text mb-1"><strong>Email:</strong> {contact.email}</p> {/* Reduced margin-bottom */}
                                    <p className="card-text mb-1"><strong>Phone:</strong> {contact.mobile}</p> {/* Reduced margin-bottom */}
                                    <div className="d-flex justify-content-end mt-3">
                                        <button className="btn btn-link text-info btn-sm me-2" aria-label="Edit">
                                            <FaEdit size={20} style={greyStyle} /> 
                                        </button>
                                        <button className="btn btn-link text-danger btn-sm" aria-label="Delete">
                                            <FaTrashAlt size={20} style={greyStyle} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
