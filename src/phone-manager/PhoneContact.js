import React, { useState, useEffect } from 'react';
import CreateContact from './CreateContact';
import { CRT_USR_CTC, GET_USR_CTC } from '../Constants';
import ContactList from '../components/ContactList';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

const PhoneContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [id, setId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user?.id;

    const handleSearch = async () => {
        if (isValidObjectId(id)) {
            setLoading(true);
            setError('');
            try {
                // Correct URL construction
                const url = `${GET_USR_CTC}/${encodeURIComponent(id)}`;
                console.log('Fetch URL:', url);
    
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                console.log('Fetch response status:', response.status);
    
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log('Fetched contact data:', data);
                setContacts(data ? [data] : []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Invalid search ID format');
        }
    };
    
    
    useEffect(() => {
        const fetchContacts = async () => {
            if (uid && isValidObjectId(uid)) {
                setLoading(true);
                setError('');
                console.log(`Fetching contacts for user ID: ${uid}`);
                try {
                    const response = await fetch(`${CRT_USR_CTC}?user_id=${encodeURIComponent(uid)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    console.log('Fetch response status:', response.status);

                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('Fetched contacts data:', data);
                    setContacts(data || []);
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

    const findIdByName = (name) => {
        console.log(`Finding ID for contact name: ${name}`);
        if (!contacts) {
            console.error('Contacts is undefined');
            return null;
        }
        const result = contacts.find(item => item.name === name);
        console.log('Search result:', result);
        return result ? result._id : null;
    };

    const updateSearchQuery = (e) => {
        const name = e.target.value;
        setQuery(name);
        const foundId = findIdByName(name);
        setId(foundId);
        console.log(`Search query updated: ${name}, found ID: ${foundId}`);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CreateContact />
            {error && <p className="text-danger">{error}</p>}
            <div className="mt-4">
                <div className="d-flex justify-content-center">
                    <div className="w-45">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                value={query}
                                onChange={updateSearchQuery}
                                placeholder="Search"
                            />
                            <InputGroup.Text
                                style={{ cursor: 'pointer' }}
                                onClick={handleSearch}
                            >
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </div>
            </div>
            {contacts.length > 0 && <ContactList contacts={contacts} />}
        </>
    );
};

export default PhoneContact;
