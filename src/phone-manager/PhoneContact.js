import React, { useState, useEffect } from 'react';
import CreateContact from './CreateContact';
import { CRT_USR_CTC } from '../Constants';
import ContactList from '../components/ContactList';

const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

const PhoneContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user?.id;

    useEffect(() => {
        const fetchContacts = async () => {
            if (uid && isValidObjectId(uid)) {
                try {
                    const response = await fetch(`${CRT_USR_CTC}?user_id=${encodeURIComponent(uid)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.message}`);
                    }

                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setContacts(data);
                } catch (err) {
                    console.error('Fetch error:', err);
                    setError(`Error: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Invalid user ID format or no user ID found');
                setLoading(false);
            }
        };

        fetchContacts();
    }, [uid]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CreateContact />
            {error && <p>{error}</p>} 
            <ContactList contacts={contacts} />
        </>
    );
};

export default PhoneContact;
