import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ContactCard = ({ contact }) => {
    const greyStyle = { color: 'grey' };
    const {name, email, mobile} = contact;

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{name}</h4>
                    <p className="card-text mb-1"><strong>Email:</strong> {email}</p>
                    <p className="card-text mb-1"><strong>Phone:</strong> {mobile}</p>
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
    );
};

export default ContactCard;
