import React, { useEffect } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { BsPersonCircle, BsHouseFill, BsDoorOpenFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Correção na importação
import '../style/css.css';
import recicloLogo from '../images/reciclo-logo.png';


function Header() {
    const navigate = useNavigate();
    let roleNames = '';
    let userName = ''
    const access_token = localStorage.getItem("token");
    const decodedToken = jwtDecode(access_token);
    roleNames = decodedToken.roleNames;
    userName = decodedToken.name.split(' ')[0]; 

    const handleInicioClick = () => {
        navigate(`/perfil-${roleNames}`); 
    };

    const handleUsuarioClick = () => {
        navigate('/usuario');
    };

    const handleSairClick = () => {
        localStorage.removeItem("token"); 
        navigate('/');
    };

    return (
        <>
            <Navbar expand="lg" className='login-navbar'>
                <Container className="d-flex justify-content-between align-items-center">
                    <Button className="outline-orange" onClick={handleInicioClick}>
                        <BsHouseFill /> Início
                    </Button>
                    <Navbar.Brand href="#home">
                        <img src={recicloLogo} alt="Reciclo Logo" style={{ maxWidth: '100px' }} />
                    </Navbar.Brand>
                    <div className="d-flex">
                        <Button className="outline-orange" onClick={handleUsuarioClick}>
                            <BsPersonCircle /> Olá, {userName}
                        </Button>
                        <div className='m-1'></div>
                        <Button className="outline-orange" onClick={handleSairClick}>
                            <BsDoorOpenFill /> Sair
                        </Button>
                    </div>
                </Container>
            </Navbar >
        </>
    );
}

export default Header;