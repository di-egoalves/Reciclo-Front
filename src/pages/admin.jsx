import React from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import {
  BsPeopleFill,
  BsShareFill,
  BsBarChartFill,
  BsFillFileEarmarkFill,
  BsBicycle,
} from "react-icons/bs"; //TODO: "BsPeopleFill" NÃO ESTA SENDO UTILIZADO
import TelaAdmin from "../images/telaadmin.svg";
import "../style/css.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const linkListaCatador = () => {
    navigate("/lista-catadores-adm");
  };

  const linkListaAssociacao = () => {
    navigate("/lista-associacao");
  };

  const linkListaOperadorLogistico = () => {
    navigate("/lista-operador");
  };

  const linkFormularioColeta = () => {
    navigate("/lista-coleta");
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

  const buttonsData = [
    { onClick: linkListaCatador, icon: BsBicycle, text: "Catadores" },
    { onClick: linkListaAssociacao, icon: BsShareFill, text: "Associações" },
    {
      onClick: linkListaOperadorLogistico,
      icon: BsShareFill,
      text: "Operador Logistico",
    },
    {
      onClick: linkFormularioColeta,
      icon: BsFillFileEarmarkFill,
      text: "Formulário de Coletas",
    },
    {
      onClick: linkFormularioVenda,
      icon: BsFillFileEarmarkFill,
      text: "Formulário de Vendas",
    },
    {
      onClick: linkRelatorioColeta,
      icon: BsBarChartFill,
      text: "Relatório de Coletas",
      className: "outline-white",
    },
    {
      onClick: linkRelatorioVenda,
      icon: BsBarChartFill,
      text: "Relatório de Vendas",
      className: "outline-white",
    },
  ];

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
        <Col className="d-flex align-items-center justify-content-center d-md-block d-none">
          <Image src={TelaAdmin} />
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <div>
            <h5 className="text-center mb-3">
              Você está acessando como
              <span style={{ color: "#EF7A2A" }}> ADMINISTRADOR</span> da
              plataforma.
            </h5>
            {/* TODO: CODIGO COMENTADO */}
            {/* <Button type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsBicycle size={20} className='m-2'/>VEÍCULOS </Button>
                            <Button type='submit' className='rounded-5 btn-orange w-100 p-3 mb-2'><BsRecycle size={20} className='m-2'/>MATERIAL </Button> */}
            {buttonsData.map(
              ({ onClick, icon: Icon, text, className }, index) => (
                <Button
                  key={`${index}-${text}`}
                  onClick={onClick}
                  type="submit"
                  className={`rounded-5 ${
                    className ?? "btn-orange"
                  } w-100 p-3 mb-2`}
                >
                  <Icon size={20} className="m-2" />
                  {text}
                </Button>
              )
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
