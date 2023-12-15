import React from 'react';
import { Button, Col, Container, Row, Image } from 'react-bootstrap';
import { BsPeopleFill, BsShareFill, BsBarChartFill, BsFillFileEarmarkFill, BsBicycle } from "react-icons/bs";
import TelaAdmin from '../images/telaadmin.svg'
import '../style/css.css';
import { useNavigate } from "react-router-dom";
 
function OperadorLogistico() {

        const navigate = useNavigate();
      
        const linkListaCatador = () => {
          navigate("/lista-catadores-adm");
        };
      
        const linkListaAssociacao = () => {
          navigate("/lista-associacao");
        };

        const linkFormularioColeta = () => {
            navigate("/lista-relatorio-coleta");
          };

        const linkFormularioVenda = () => {
            navigate("/lista-venda");
          };

        const linkRelatorioColeta = () => {
            navigate("/lista-relatorio-coleta");
          };

        const linkRelatorioVenda = () => {
            navigate("/lista-relatorio-venda");
          };

    return (
        <>
            <Container className='d-flex justify-content-center align-items-center'style={{ minHeight: '90vh' }}>
                <Row className='border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5'>
                    <Col className="d-flex align-items-center justify-content-center d-md-block d-none">
                        <Image src={TelaAdmin}/>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div>
                            <h5 className='text-center mb-3'>Você está acessando como <span style={{ color: '#EF7A2A' }}>ADMINISTRADOR</span> da plataforma.</h5>
                            <Button onClick={linkListaCatador} type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsBicycle size={20} className='m-2'/>Catadores </Button>
                            {/* <Button type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsBicycle size={20} className='m-2'/>VEÍCULOS </Button>
                            <Button type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsRecycle size={20} className='m-2'/>MATERIAL </Button> */}
                            <Button onClick={linkListaAssociacao} type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsShareFill size={20} className='m-2'/>Associações </Button>
                            <Button onClick={linkFormularioColeta} type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsFillFileEarmarkFill size={20} className='m-2'/>Formulário de Coletas</Button>
                            <Button onClick={linkFormularioVenda} type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsFillFileEarmarkFill size={20} className='m-2'/>Formulário de Vendas</Button>
                            <Button onClick={linkRelatorioColeta} type='submit' className='rounded-5 outline-white w-100 p-3 mb-2'><BsBarChartFill size={20} className='m-2'/>Relatório de Coletas</Button>
                            <Button onClick={linkRelatorioVenda} type='submit' className='rounded-5 outline-white w-100 p-3 mb-2' ><BsBarChartFill size={20} className='m-2'/>Relatório de Vendas</Button>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default OperadorLogistico;