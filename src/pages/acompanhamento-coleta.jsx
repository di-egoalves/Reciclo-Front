import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { ButtonGroup, ToggleButton } from "react-bootstrap"; //TODO: NÃO ESTA SENDO UTILIZADO
import "../style/css.css";
import { useNavigate } from "react-router-dom";

function AcompanhamentoColeta() {
  const [selectedOptionRota, setSelectedOptionRota] = useState(null);
  const handleOptionRotaClick = (option) => {
    setSelectedOptionRota(option);
  };

  const [selectedOptionVeiculo, setOptionVeiculo] = useState(null);
  const handleOptionVeiculoClick = (option) => {
    setOptionVeiculo(option);
  };

  const navigate = useNavigate();

  //TODO: FUNCAO "handleClick" NÃO ESTA SENDO UTILIZADA
  const handleClick = () => {
    navigate("/acompanhamento-coleta");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center border bg-white rounded-5 shadow w-100 p-5 mt-5">
      <Row>
        <h5 style={{ color: "#EF7A2A" }}>ACOMPANHAMENTO DE COLETAS</h5>
      </Row>

      <Row className="w-100 my-3">
        <Form>
          <Form.Label>1. Nome da Associação ou grupo: </Form.Label>
          <Form.Control type="text" />
        </Form>
      </Row>

      <Row className="w-100 my-3">
        <Form>
          <Form.Label>2. Nome do Catador: </Form.Label>
          <Form.Control />
        </Form>
      </Row>

      <Row className="w-100 my-3">
        <Form>
          <Row>
            <Form.Label className="w-100">
              3. Essa é qual rota do dia? Marque o n° da rota ou viagem
            </Form.Label>
          </Row>

          <div className="btn-group d-flex justify-content-center" role="group">
            {[
              "option1",
              "option2",
              "option3",
              "option4",
              "option5",
              "option6",
            ].map((option, index) => (
              <label
                key={option}
                className={`rounded-5 btn px-5 py-2 mb-2 mx-2 ${
                  selectedOptionRota === option ? "btn-orange" : "outline-white"
                }`}
              >
                <input
                  type="checkbox"
                  className="d-none"
                  onClick={() => handleOptionRotaClick(option)}
                />
                {index + 1}
              </label>
            ))}
          </div>
          <Form.Label className="mt-3 d-flex align-items-center">
            Outro:
            <Form.Control />
          </Form.Label>
        </Form>
      </Row>

      <Row className="w-100 my-3">
        <Form.Label>4. Quantidade de residíduos coletados: </Form.Label>
        <Form.Label className="d-flex align-items-center">
          <Form.Control type="number" /> (Kg)
        </Form.Label>
      </Row>

      <Row className="w-100 my-3">
        <Form>
          <Form.Label>5. Tipo de Veículo: </Form.Label>

          {/* TODO: DARIA PRA FAZER UMA REFATORACAO NOS BOTOES ABAIXO, IGUAL EU FIZ ACIMA.CASO QUEIRA */}
          <div className="btn-group d-flex justify-content-center" role="group">
            <button
              type="button"
              className={`rounded-5 btn px-5 py-2 mb-2 mx-2 ${
                selectedOptionVeiculo === "option1"
                  ? "btn-orange"
                  : "outline-white"
              }`}
              onClick={() => handleOptionVeiculoClick("option1")}
            >
              Tricilo
            </button>
            <button
              type="button"
              className={`rounded-5 btn px-5 py-2 mb-2 mx-2 ${
                selectedOptionVeiculo === "option2"
                  ? "btn-orange"
                  : "outline-white"
              }`}
              onClick={() => handleOptionVeiculoClick("option2")}
            >
              Caminhão
            </button>
            <button
              type="button"
              className={`rounded-5 btn px-5 py-2 mb-2 mx-2 ${
                selectedOptionVeiculo === "option3"
                  ? "btn-orange"
                  : "outline-white"
              }`}
              onClick={() => handleOptionVeiculoClick("option3")}
            >
              Carroça
            </button>
          </div>
        </Form>
      </Row>

      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Button
            type="submit"
            className="rounded-5 btn-orange w-25 m-3"
            style={{ height: "40px" }}
          >
            VOLTAR
          </Button>
          <Button
            type="submit"
            className="rounded-5 btn-orange w-25 m-3"
            style={{ height: "40px" }}
          >
            ENTRAR
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default AcompanhamentoColeta;
