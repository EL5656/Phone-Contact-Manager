import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';

const CreateContact = ({ contact, onSave }) => {
    const [formData, setFormData] = useState(contact || {});

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        }
    }, [contact]);

    const handleSubmit = async (data) => {
        try {
            await onSave(data);
        } catch (err) {
            console.error('Form submission error:', err);
        }
    };

    return (
        <div>
            <FormField
                title="Contact"
                fields={[
                    { name: 'name', label: 'Name', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'mobile', label: 'Mobile', type: 'text', required: true },
                ]}
                initialData={formData}
                onSubmit={handleSubmit}
                onError={(err) => {
                    console.error('Form error:', err.message || err);
                }}
                onSuccess={(data) => console.log('Contact saved successfully!', data)}
                primaryBtnClass="btn btn-primary"
                primaryBtnTxt="Save"
            />
        </div>
    );
};

export default CreateContact;
