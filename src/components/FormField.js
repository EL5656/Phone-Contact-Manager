import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextButton from './TextButton';
import { Form, Button, Container, Alert, InputGroup } from 'react-bootstrap';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const FormField = ({ title, fields, onSuccess, successMsg, onError, onSubmit, primaryBtnClass, primaryBtnTxt, textBtnText, textBtnClick }) => {
    const [formData, setFormData] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const renderSuccessMessage = () => {
        if (typeof successMsg === 'function') {
            return successMsg(); 
        }
        return <div>{successMsg}</div>; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onSubmit(formData);

            if (res.message) {
                onError(res.message);
                setError(res.message);
            }
            onSuccess(res);
            //setSuccess(res);

        } catch (error) {
            const errorMessage = error.message || 'An unexpected error occurred';
            onError(errorMessage);
            setError(errorMessage);
        }
    };


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <Container>
            <div className="mt-5">
                <div className="d-flex justify-content-center">
                    <div className="w-50">
                        <Form onSubmit={handleSubmit}>
                            <h2 className="mb-4 text-center">{title}</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {renderSuccessMessage()}
                            {fields.map((field, index) => (
                                <Form.Group key={index} className="mb-3">
                                    <Form.Label>{field.label}</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={field.type === 'password' && !passwordVisible ? 'password' : 'text'}
                                            name={field.name}
                                            required={field.required}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder || ''}
                                        />
                                        {field.type === 'password' && (
                                            <InputGroup.Text
                                                style={{ cursor: 'pointer' }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                            </InputGroup.Text>
                                        )}
                                    </InputGroup>
                                </Form.Group>
                            ))}
                            <div className="d-flex justify-content-center mt-4">
                                <Button
                                    type="submit"
                                    className={primaryBtnClass}
                                    variant="primary"
                                >
                                    {primaryBtnTxt}
                                </Button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <TextButton text={textBtnText} onClick={textBtnClick} />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FormField;
