import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Header from './Header';
import { Container } from 'react-bootstrap';

class AddContact extends React.Component {
    render() {
        return (
            <Container>
                <Header text="Contact Manager" />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        id="mobile"
                                        name="mobile"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Add Contact
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default AddContact;
