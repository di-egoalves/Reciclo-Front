import { useState } from 'react';
import { Nav, Button, Offcanvas, Navbar, Container } from 'react-bootstrap';
import { BsDoorOpenFill, BsList, BsPersonCircle } from "react-icons/bs";
import recicloLogo from '../images/reciclo-logo.png';

function HeaderResponsive() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" className='login-navbar'>
                <Container className="d-flex ">

                    

                    <Navbar.Brand href="#home" className='justify-content-center mx-auto'>
                        <img src={recicloLogo} alt="Reciclo Logo" style={{ maxWidth: '100px' }} />
                    </Navbar.Brand>

                        <Navbar.Toggle className='btn btn-danger justify' onClick={handleShow}/>



                    <Offcanvas show={show} onHide={handleClose} className='login-navbar'>
                        <Offcanvas.Header className='justify-content-end mx-2' closeButton>

                        </Offcanvas.Header>

                        <Offcanvas.Body className='d-flex flex-column '>
                            
                                <Button className="outline-orange">
                                    <BsPersonCircle /> Olá, usuário
                                </Button>

                                <Button className="outline-orange mt-2">
                                    <BsDoorOpenFill /> Sair
                                </Button>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </Navbar>








        </>
    );
}

export default HeaderResponsive;
