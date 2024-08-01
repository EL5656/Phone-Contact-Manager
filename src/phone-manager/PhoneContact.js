import React, { useState, useEffect } from 'react';
import CreateContact from './CreateContact';
import { CRT_USR_CTC, GET_USR_CTC, UPD_USR_CTC, DLT_USR_CTC } from '../Constants';
import ContactList from '../components/ContactList';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import PMSModal from '../components/PMSModal';

const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

const PhoneContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [id, setId] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user?.id;

    const handleSearch = async () => {
        if (isValidObjectId(id)) {
            setLoading(true);
            setError('');
            try {
                const url = `${GET_USR_CTC}/${encodeURIComponent(id)}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Network response was not ok: ${response.statusText} - ${errorData.message}`);
                }

                const data = await response.json();
                setContacts(data ? [data] : []);
            } catch (err) {
                setError(`Error: ${err.message || 'Unknown error occurred'}`);
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
                try {
                    const response = await fetch(`${CRT_USR_CTC}?user_id=${encodeURIComponent(uid)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Network response was not ok: ${response.statusText} - ${errorData.message}`);
                    }

                    const data = await response.json();
                    setContacts(data || []);
                } catch (err) {
                    setError(`Error: ${err.message || 'Unknown error occurred'}`);
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

    const handleSave = async (data) => {
        const isNewContact = !data._id;
        const method = isNewContact ? 'POST' : 'PUT';
        const url = isNewContact ? CRT_USR_CTC : `${UPD_USR_CTC}/${data._id}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${response.statusText} - ${errorData.message}`);
            }

            const updatedContact = await response.json();
            setContacts(prevContacts => {
                if (isNewContact) {
                    return [...prevContacts, updatedContact];
                }
                return prevContacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact);
            });

            setSelectedContact(null); // Clear the selected contact after save
        } catch (err) {
            console.error(`Failed to save contact: ${err}`);
            setError(`Failed to save contact: ${err.message || 'Unknown error occurred'}`);
        }
    };

    const handleEdit = (contact) => {
        setSelectedContact(contact);
    };

    const findIdByName = (name) => {
        if (!contacts) return null;
        const result = contacts.find(item => item.name === name);
        return result ? result._id : null;
    };

    const updateSearchQuery = (e) => {
        const name = e.target.value;
        setQuery(name);
        const foundId = findIdByName(name);
        setId(foundId);
    };

    const handleDelete = async (contactId) => {
        try {
            const response = await fetch(`${DLT_USR_CTC}/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId));
            setShowDeleteModal(false);
        } catch (err) {
            console.error(`Failed to delete contact: ${err}`);
            setError(`Failed to delete contact: ${err.message}`);
        }
    };

    const confirmDelete = (contactId) => {
        setContactToDelete(contactId);
        setShowDeleteModal(true);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CreateContact contact={selectedContact} onSave={handleSave} />
            {error && <p className="text-danger">{String(error)}</p>}
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
            {contacts.length > 0 &&
                <ContactList
                    contacts={contacts}
                    onEdit={(data) => handleEdit(data)}
                    onDelete={(contactId) => confirmDelete(contactId)}
                />
            }
             <PMSModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Confirm Delete"
                body="Are you sure you want to delete this contact?"
                onConfirm={() => handleDelete(contactToDelete)}
            />
        </>
    );
};

export default PhoneContact;
