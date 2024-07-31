import React, { useState, useEffect, useContext } from 'react';
import FormField from '../components/FormField';
import { useNavigate } from 'react-router-dom';
import { PMS_USR_LOGIN, VLD_USR_LOGIN } from '../Constants';

const Login = () => {
    const navigateTo = useNavigate();
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        if (accessToken) {
            console.log("Access token generated!");
            localStorage.setItem('token', accessToken);
            validateUserLogin(accessToken); 
        }
    }, [accessToken]);

    const fields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
    ];

    const signUp = () => {
        navigateTo('/');
    };

    const validateUserLogin = async (token) => {
        try {
            const response = await fetch(VLD_USR_LOGIN, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("Login user: ", data);
            localStorage.setItem("user",JSON.stringify(data));
            navigateTo("/contact");
        } catch (error) {
            throw new Error(error);
        };

    };

    const loginUser = async (data) => {
        try {
            const response = await fetch(PMS_USR_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            setAccessToken(res.accessToken);
            return res;
        } catch (error) {
            throw new Error(error);
        };
    };

    return (
        <>
            <FormField
                title="Login"
                fields={fields}
                onSubmit={loginUser}
                onSuccess={(res) => {
                    console.log(res);//access token
                }}
                onError={(error) => {
                    console.log('Login error:', error);
                }}
                primaryBtnTxt="Login"
                primaryBtnClass="w-25 btn btn-primary"
                textBtnText="Sign Up"
                textBtnClick={signUp}
            />

        </>
    );
};

export default Login;
