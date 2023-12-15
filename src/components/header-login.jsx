import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import recicloLogo from '../images/reciclo-logo.png'; // Corrija o nome da variável

function HeaderLogin() {
    return (
        <>
            <Navbar expand="lg" className='login-navbar'>
                <Container className="d-flex justify-content-center align-items-center">
                    <Navbar.Brand href="#home">
                        <img src={recicloLogo} alt="Reciclo Logo" style={{ maxWidth: '100px' }} />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default HeaderLogin;
