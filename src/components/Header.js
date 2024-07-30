
import React from 'react';
import Container from 'react-bootstrap/Container';


const Header = ({text}) => {
    return (
        <Container className="text-center mt-5">
            <h1 className="font-weight-bold">{text}</h1>
        </Container>
    );
};

export default Header;
