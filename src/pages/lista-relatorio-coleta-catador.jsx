import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Image,
  Row,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import fotoPerfil from "../images/perfil.jpg";

import "../style/css.css";
import {
  BsArrowLeftShort,
  BsCalendar,
  BsDownload,
  BsEye,
  BsEyeFill,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Autenticacao } from "../config/Autenticacao";
import RelatorioColeta from "./relatorio-coleta";

import { API } from "../services/api";

function ListaRelatorioColetaCatador() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coletas, setColetas] = useState([]);
  const [showRelatorio, setShowRelatorio] = useState(false);

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

    // Se o formato não for reconhecido, retorna o formato padrão.
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    navigate(-1);
  };
  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  // Configuração do cabeçalho com o token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const params = {
    datainicio: formatDate(startDate, "dd/MM/yyyy"),
    datafim: formatDate(endDate, "dd/MM/yyyy"),
  };
  console.log("Parâmetros da Requisição:", params);

  const handleClick = async () => {
    try {
      const response = await API.get(
        "/forms/coleta/encontrar-entre-datas/by-catador",
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   setShowRelatorio(true);
      let catadorId = 0
      if (response.data.length > 0) {
         catadorId = response.data[0].idCatador;
      }


      navigate("/relatorio-coleta", {
        state: {
          coletas: response.data,
          startDate: startDate,
          endDate: endDate,
          catadorId
        },
      });
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await API.get(
        `/pdf/coleta-catador`, // Supondo que você deseja usar o ID da primeira venda
        {
          params: {
            completo: true,
            datainicio: formatDate(startDate, "dd/MM/yyyy"),
            datafim: formatDate(endDate, "dd/MM/yyyy"),
          },
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
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
              />
            </Col>
            <Col className="p-0 ms-3">
              <Form.Label className="text-orange mt-3">Data Final</Form.Label>
              <Form.Control
                type="date"
                className="custom-focus"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
          </Row>

          <div className="mt-5 d-flex center justify-content-evenly">
            <Button
              type="submit"
              className="w-25 mx-2 btn-orange"
              onClick={handleClick}
              disabled={!startDate || !endDate }

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

export default ListaRelatorioColetaCatador;
