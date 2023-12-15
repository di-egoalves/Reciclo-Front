import React from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import {
  BsPeopleFill,
  BsRecycle,
  BsBicycle,
  BsShareFill,
  BsBarChartFill,
  BsCoin,
  BsFillFileEarmarkFill,
} from "react-icons/bs"; //TODO: 'BsPeopleFill', 'BsRecycle', 'BsShareFill' E 'BsCoin' NÃO ESTAO SENDO USADOS
import { useNavigate } from "react-router-dom";
import TelaAdmin from "../images/telaadmin.svg";
import "../style/css.css";

function Associacao() {
  const navigate = useNavigate();

  const linkListaCatador = () => {
    navigate("/lista-catador");
  };

  const linkFormularioVenda = () => {
    navigate("/lista-venda");
  };

  const linkRelatorioVenda = () => {
    navigate("/lista-relatorio-venda-associacao");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
        <Col className="d-flex align-items-center justify-content-center">
          <Image src={TelaAdmin} />
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <div>
            <h5 className="text-center mb-3">
              Você está acessando como{" "}
              <span style={{ color: "#EF7A2A" }}>ASSOCIAÇÃO</span> da
              plataforma.
            </h5>
            {/* TODO: DARIA PARA APLICAR UMA REFATORACO NOS BOTOES ABAIXO, IGUAL EU
            REALIZEI EM OUTRAS TELAS, CASO QUEIRA */}
            <Button
              onClick={linkListaCatador}
              type="submit"
              className="rounded-5 btn-orange w-100 p-3 mb-2"
            >
              <BsBicycle size={20} className="m-2" />
              Catadores
            </Button>
            <Button
              onClick={linkFormularioVenda}
              type="submit"
              className="rounded-5 btn-orange w-100 p-3 mb-2"
            >
              <BsFillFileEarmarkFill size={20} className="m-2" />
              Formulário de Vendas
            </Button>
            <Button
              onClick={linkRelatorioVenda}
              type="submit"
              className="rounded-5 outline-white w-100 p-3 mb-2"
            >
              <BsBarChartFill size={20} className="m-2" />
              Relatório de Vendas
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Associacao;
