import React from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import {
  BsFillFileEarmarkFill,
  BsBarChartFill,
  BsRecycle,
} from "react-icons/bs"; //TODO:  'BsRecycle' NÃO ESTA SENDO USADO
import TelaAdmin from "../images/telaadmin.svg";
import "../style/css.css";
import { useNavigate } from "react-router-dom";

function Catador() {
  const navigate = useNavigate();

  const linkListaColeta = () => {
    navigate("/lista-coleta-catador");
  };

  const linkRelatorioColeta = () => {
    navigate("/lista-relatorio-coleta-catador");
  };

  return (
    <>
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
                <span style={{ color: "#EF7A2A" }}>CATADOR</span> da plataforma.
              </h5>
              {/* TODO: DARIA PARA APLICAR UMA REFATORACO NOS BOTOES ABAIXO, IGUAL EU
            REALIZEI EM OUTRAS TELAS, CASO QUEIRA */}
              <Button
                type="submit"
                onClick={linkListaColeta}
                className="rounded-5 btn-orange w-100 p-3 mb-2"
              >
                <BsFillFileEarmarkFill size={20} className="m-2" />
                Formulário de Coleta
              </Button>
              <Button
                type="submit"
                onClick={linkRelatorioColeta}
                className="rounded-5 btn-orange w-100 p-3 mb-2"
              >
                <BsBarChartFill size={20} className="m-2" /> Relatório de
                Coletas
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Catador;
