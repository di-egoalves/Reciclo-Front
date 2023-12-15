import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row, Dropdown } from "react-bootstrap";
import { BsArrowLeftShort, BsDownload, BsEyeFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Autenticacao } from "../config/Autenticacao";
import { API } from "../services/api";
import * as XLSX from "xlsx";


function ListaRelatorioColeta() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coletas, setColetas] = useState([]);
  const [catadores, setCatadores] = useState([]);
  const [selectedCatador, setSelectedCatador] = useState(null);
  const [visualSelectedCatador, setVisualSelectedCatador] = useState("");
  const [idCatador, setIdCatador] = useState("");

  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchCatadores = async () => {
    try {
      const response = await API.get("/catadores", config);
      setCatadores(response.data);
    } catch (error) {
      console.error("Erro ao obter lista de catadores:", error);
    }
  };

  useEffect(() => {
    fetchCatadores();
  }, []); // Carregar a lista de catadores quando o componente for montado

  //TODO: 'handleLast7Days','handleLast15Days', 'handleLast30Days' E 'formatDate'.COMO DISSE EM OUTRAS PARTES DO CODIGO, PODE SER DEFINIDO ESSAS FUNCOES COMO
  //UTILITARIAS, OU SEJA CRIE UM ARQUIVO PARA ELAS E IMPORTE-AS QUANDO PRECISAR, ISSO EVITA
  //REPETICAO DE CODIGO

  const handleLast7Days = () => {
    const today = new Date();
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    setStartDate(formatDate(last7Days));
    setEndDate(formatDate(today));
  };

  const handleLast15Days = () => {
    const today = new Date();
    const last15Days = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
    setStartDate(formatDate(last15Days));
    setEndDate(formatDate(today));
  };

  const handleLast30Days = () => {
    const today = new Date();
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    setStartDate(formatDate(last30Days));
    setEndDate(formatDate(today));
  };

  const formatDate = (date, format = "yyyy-MM-dd") => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (format === "yyyy-MM-dd") {
      return `${year}-${month}-${day}`;
    } else if (format === "dd/MM/yyyy") {
      return `${day}/${month}/${year}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handlecatadorChange = ({ id, user: { name } }) => {
    setSelectedCatador(id);
    setVisualSelectedCatador(name);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    navigate(-1);
  };

  const params = {
    datainicio: formatDate(startDate, "dd/MM/yyyy"),
    datafim: formatDate(endDate, "dd/MM/yyyy"),
  };

  const handleClick = async () => {
    try {
      const response = await API.get(
        `/forms/coleta/findBetweenDates/${selectedCatador}`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setColetas(response.data);
      const selectedCatadorInfo = catadores.find(catador => catador.id === selectedCatador);

      navigate("/relatorio-coleta-adm", {
        state: {
          coletas: response.data,
          startDate: startDate,
          endDate: endDate,
          catadorInfo: selectedCatadorInfo
        },
      });
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };





  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Row className="p-5 border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
          <h3 className="mt-3 p-0" style={{ color: "#EF7A2A" }}>
            Relatório de Coleta
          </h3>
          <hr className="mb-4" />
          <Row className="mt-3">
            <Col>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100 outline-white"
                  id="dropdown-basic"
                >
                  {visualSelectedCatador || "Selecione um Catador"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {catadores.map((catador, index) => (
                    <Dropdown.Item
                      key={catador.id}
                      onClick={() => handlecatadorChange(catador)}
                    >
                      {catador.user.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* TODO: DARIA PRA REFATORAR ESSES ITENS ABAIXO, COMO FIZ EM ALGUMAS TELAS*/}
          <Row className="justify-content-evenly mt-2">
            <Form.Label className="text-orange mt-2 ps-1">
              Escolha um Período
            </Form.Label>
            <Button
              className="rounded-5 w-25 pt-2 outline-white"
              onClick={handleLast7Days}
            >
              Últimos 7 dias
            </Button>
            <Button
              className="rounded-5 w-25 pt-2 outline-white"
              onClick={handleLast15Days}
            >
              Últimos 15 dias
            </Button>
            <Button
              className="rounded-5 w-25 pt-2 outline-white"
              onClick={handleLast30Days}
            >
              Últimos 30 dias
            </Button>
          </Row>
          <Row>
            <Col className="p-0 me-3">
              <Form.Label className="text-orange mt-3">Data Inicial</Form.Label>
              <Form.Control
                type="date"
                className="custom-focus"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Col>
            <Col className="p-0 ms-3">
              <Form.Label className="text-orange mt-3">Data Final</Form.Label>
              <Form.Control
                type="date"
                className="custom-focus"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Col>
          </Row>

          {/* Dropdown para selecionar catador */}

          <div className="mt-5 d-flex center justify-content-evenly">
            <Button
              type="submit"
              className="w-25 mx-2 btn-orange"
              onClick={handleClick}
              disabled={!startDate || !endDate || !selectedCatador}
              required
            >
              <BsEyeFill /> Visualizar
            </Button>
          
          
            <Button
              type="submit"
              className="w-25 mx-2 outline-white "
              onClick={handleGoBack}
            >
              <BsArrowLeftShort /> Voltar
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ListaRelatorioColeta;
