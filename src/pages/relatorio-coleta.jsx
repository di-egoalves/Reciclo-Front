import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
  Dropdown,
  Form,
  Stack,
  Modal
} from "react-bootstrap"; //TODO: "Stack", "Dropdown" E "Image"  NÃO ESTAO SENDO USADO
import "../style/css.css";
import {
  BsArrowLeftShort,
  BsDownload,
  BsEyeFill,
  BsCaretRightFill,
} from "react-icons/bs"; //TODO: "BsEyeFill" NÃO ESTAO SENDO USADO
import { Autenticacao } from "../config/Autenticacao";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../services/api";
import ResumoColeta from "../models/resumoColetas";
import html2pdf from 'html2pdf.js';
import axios from "axios";

function RelatorioColeta() {
  const [catadorName, setCatadorName] = useState("");
  const [funcaoName, setFuncaoName] = useState("");
  const [associacaoName, setAssociacaoName] = useState("");
  const [catadorInfo, setCatadorInfo] = useState({})
  const [cnpj, setCnpj] = useState("");


  const [veiculos, setVeiculos] = useState([]); //TODO: "SETTER E STATE" NÃO ESTAO SENDO USADO
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);
  const [rotasTotais, setRotasTotais] = useState(0);
  const [veiculosUtilizados, setVeiculosUtilizados] = useState([]);
  const [rotasRealizadas, setRotasRealizadas] = useState(0);
  const [idCatador, setIdCatador] = useState("");
  const [showCheckModal, setShowCheckModal] = useState(false);

  const [completo, setCompleto] = useState(false); //TODO: "SETTER" NÃO ESTA SENDO USADO

  const location = useLocation();
  const coletas = location.state?.coletas || [];
  const catadorId = location.state.catadorId
  const dataInicialParam = location.state?.startDate || "";
  const dataFinalParam = location.state?.endDate || "";

  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 

  const fetchCatadorInfo = async (idCatador) => {
    try {
      const response = await API.get(`/catadores/${idCatador}`, config);
      return {
        catadorName: response.data.user.name,
        funcaoName: response.data.funcoescatador.funcao,
        associacaoName: response.data.associacao.user.name,
        cpfCatador: response.data.user.cpf,
        endereco: response.data.endereco,
        bairro: response.data.bairro
      };
    } catch (error) {
      console.error("Erro ao obter informações do catador:", error);
      return {
        catadorName: "Nome do Catador Não Disponível",
        funcaoName: "Função do Catador Não Disponível",
        associacaoName: "Função do Catador Não Disponível",

      };
    }
  };



  const fetchCatadorName = async (idCatador) => {
    try {
      const response = await API.get(`/catadores/${idCatador}`, config);
      setCatadorName(response.data.user.name);
      setFuncaoName(response.data.funcoescatador.funcao);
    } catch (error) {
      console.error("Erro ao obter nome do catador:", error);
    }
  };


  const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("https://reciclo.api-reciclo.free.nf/current_user", config);
    console.log(response)
    const catadorName = response.data.name ;

    return catadorName;
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
    return "Nome do Catador Não Disponível";
  }
};

const fetchAssociacaoName = async (idAssociacao) => {
  try {
    const response = await API.get(`/associacoes/${idAssociacao}`, config);
    const associacaoData = {
      name: response.data.user.name,
      cnpj: response.data.cnpj
    };
    setAssociacaoName(response.data.user.name);
    setCnpj(response.data.cnpj)
    return associacaoData
  } catch (error) {
    console.error("Erro ao obter nome do associacao:", error);
    return null
  }
};
  const fetchVeiculoInfo = async (veiculoId) => {
    try {
      const response = await API.get(`/veiculos/${veiculoId}`);
      const veiculo = response.data.nomeVeiculo;
      setVeiculosUtilizados((prevVeiculos) =>
        prevVeiculos.includes(veiculo)
          ? prevVeiculos
          : [...prevVeiculos, veiculo]
      );
    } catch (error) {
      console.error("Erro ao obter informações do veículo:", error);
    }
  };

  const calcularRotasRealizadas = (coletas) => {
    return coletas.reduce((total, coleta) => {
      // Se a coleta foi realizada em todos os pontos (pergunta === true), incrementa o total
      return coleta.pergunta ? total + 1 : total;
    }, 0);
  };

  const calcularQuantidadeTotal = (coletas) => {
    return coletas.reduce((total, coleta) => total + coleta.quantidade, 0);
  };

  const calcularRotasTotais = (coletas) => {
    return coletas.length;
  };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarDataHora = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    const hora = String(dataObj.getHours()).padStart(2, "0");
    const minutos = String(dataObj.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  };

  useEffect(() => {
    const fetchData = async () => {

    if (coletas && coletas.length > 0) {
      console.log(catadorInfo)
      setCatadorInfo(catadorInfo)
      coletas.forEach(async(coleta) => {
        setIdCatador(coleta.idCatador);
        const catadorInfo = await fetchCatadorInfo(coleta.idCatador);
        setCatadorInfo((prevCatadorInfo) => ({
          ...prevCatadorInfo,
          [coleta.idCatador]: catadorInfo,
        }));
        fetchCatadorName(coleta.idCatador);
        fetchCatadorInfo(coleta.idCatador)
        fetchAssociacaoName(coleta.idAssociacao);
        fetchVeiculoInfo(coleta.idVeiculo);
      });

      const total = calcularQuantidadeTotal(coletas);
      setQuantidadeTotal(total);

      const rotasTotais = calcularRotasTotais(coletas);
      setRotasTotais(rotasTotais);

      const rotasRealizadasCount = calcularRotasRealizadas(coletas);
      setRotasRealizadas(rotasRealizadasCount);

      console.log("coletas dentro do useEffect:", coletas);
      console.log("useEffect em RelatorioColeta foi chamado.");
    } else {
      const loadCurrentUser = async () => {
        const catadorName = await fetchCurrentUser();
        setCatadorName(catadorName);
      };
  
      loadCurrentUser();
    }
  }

  fetchData();


  }, []);


  const handleConfirmPDF = async () => {
    try {
      // Abra o modal aqui, antes de iniciar qualquer lógica
      setShowCheckModal(true);
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
    }
  };
  


  const handleDownloadPDF = async () => {
    try {
      setShowCheckModal(false);
      if (!catadorInfo || Object.keys(catadorInfo).length === 0) {
        console.error('Informações do catador não disponíveis.');
        return;
      }

      console.log("aqui esta o catador info", catadorInfo)
  
      const catadorDetails = await fetchCatadorInfo(catadorInfo.id);
      const coletasData = await Promise.all(coletas.map(async (coleta) => {
        const associacaoData = await fetchAssociacaoName(coleta.idAssociacao);
        const veiculoData = await fetchVeiculoInfo(coleta.idVeiculo);
  
        return {
          ...coleta,
          catadorData: catadorDetails,
          associacaoData,
          veiculoData,
        };
      }));
  
      const resumoColetas = new ResumoColeta(coletasData);
  
      const pdfOptions = {
        margin: 10,
        filename: 'relatorio.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
      const pdfContentPromise = formatarColetasFrontend({
        coletas: coletasData,
        catador: catadorDetails,
        startDate: formatarData(dataInicialParam),
        endDate: formatarData(dataFinalParam),
        resumoColetas,
      }, completo);
  
      pdfContentPromise.then(resolvedContent => {
        const element = document.createElement('div');
        element.innerHTML = resolvedContent;
  
        html2pdf(element, pdfOptions);
      

      }).catch(error => {
        console.error('Erro durante a geração do PDF:', error);
      });
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
    } 
  };
  

  const formatarColetasFrontend = async ({ coletas, catador, startDate, endDate, resumoColetas }, completo) => {
    // Sua lógica de estilos aqui
    const style = `<style type="text/css">
  *{
      margin:0;
      padding: 0;
  }
  html {
    -webkit-print-color-adjust: exact;
  }
  body {
      font-family: sans-serif;
      padding: 0 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  #container-logo{
    height: 40px;
    padding: 30px;
    min-width: 10px;
    background-color: #E1621E;
    border-radius: 30px;
    margin-bottom: 30px;
  }

  #container-logo img{
    height: 100%;
  }

  h1, h2, h3 {
      text-transform: uppercase;
      color: #E1621E;
      text-align: center;
      margin-bottom: 30px;
      width: 100%;
  }

  .container {
      border:#E1621E 2px solid;
      border-radius: 30px;
      padding: 20px 30px;
      width:100%;
      margin-bottom: 50px;

      display: flex;
      flex-direction: column;
      align-items: start;
  }

  p{
      color:rgb(95, 95, 95);
      font-size: 20px;
      margin-bottom: 10px;
      width: 100%;
      font-display: inherit;
  }

  .linha{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
  }

  .linha p{
      width:50%;
      font-size: 20px;
  }

  .margin-top{
    margin-top: 30px;
  }

  ul{
    margin-left: 20px;
    color: #E1621E;
    font-size: 30px;
  }
</style>`;

    console.log("dados coleta: ", coletas, catador, startDate, endDate, resumoColetas, completo)


 const catadorInfo = coletas.idCatador != null ? `
<div class="container">
  <h2>Dados de catador</h2>
  <div class="linha">
    <p><b>Catador</b>: ${catador.catadorName}</p>
    <p><b>CPF</b>: ${catador.cpf}</p>
  </div>
  <div class="linha">
    <p><b>Bairro</b>: ${catador.bairro}</p>
    <p><b>Endereço</b>: ${catador.endereco}</p>
  </div>
</div>` : "";


    const resumo = `
<div class="container"> 
  <h2>Resumo da Coleta</h2>
  <p><b>Datas</b>: ${startDate} - ${endDate}</p>
  <p><b>Quantidade de coletas realizadas</b>: ${resumoColetas.quantidadeColetas}</p>
  <p><b>Quantidade de resíduos coletados</b>: ${resumoColetas.quantidadeColetada} kg</p>
</div>`;
    let main = "";

    if (completo) {
      main += '<h2>Coletas realizadas:</h2>';
      for (let coleta of coletas) {

        let catador = null;

        if (coleta.idCatador != null) {
          catador = await fetchCatadorInfo(coleta.idCatador);
        }

        let associacaoInfo = null;

        if (coleta.idAssociacao != null) {
          associacaoInfo = await fetchAssociacaoName(coleta.idAssociacao);
        }

        console.log(catador);
        console.log(associacaoInfo)
        const coletaFormatada = `
      <div class="container">
        ${coleta.idCatador != null
            ? ''
            : `
            <p><b>Nome do catador</b>: ${catador.catadorName}</p>
            <p><b>Cpf do catador</b>: ${catador.cpfCatador}</p>
          `}
        <p><b>Nome do associacao</b>: ${associacaoInfo.name}</p>
        <p><b>CNPJ da associacao</b>: ${associacaoInfo.cnpj}</p>
        <p><b>Data</b>: ${formatarData(coleta.dataColeta)}</p>
        <p><b>Veículo utilizado</b>: ${veiculosUtilizados.map(veiculo => veiculo).join(', ')}</p>
        <p><b>Quantidade de resíduos coletados</b>: ${coleta.quantidade} kg</p>
        <p><b>Todos os pontos coletados</b>: ${coleta.pergunta ? 'Sim' : 'Não'}</p>
        <p><b>Motivo</b>: ${coleta.motivo == null || coleta.motivo == "" ? '--' : coleta.motivo}</p>
      </div>`;
        main += coletaFormatada;

      }
    }

    const conteudoPDF = `
    <html>
      <head>
        ${style}
      </head>
      <body>
        <div id="container-logo">
          <img src="https://drive.google.com/uc?export=download&id=16E44t6GPW24wkxOBbLIiag1LJptWokk1" alt="">
        </div>
        ${catadorInfo}
        ${resumo}
        ${main}
      </body>
    </html>
  `;

    return conteudoPDF;
  };











  return (
    <>
      <Container
        className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5"
        style={{ minWidth: "90vh" }}
      >
        <Row>
          <Col>
            <Row className="mb-3">
              <Col className="w-25 ">
                <Form.Label className="text-orange fw-bold">
                  DATA INICIAL
                </Form.Label>
                <Form.Control
                  type="date"
                  disabled
                  className="custom-focus"
                  value={dataInicialParam}
                />
              </Col>
              <Col className="w-25 ">
                <Form.Label className="text-orange fw-bold">
                  DATA FINAL
                </Form.Label>
                <Form.Control
                  type="date"
                  disabled
                  className="custom-focus"
                  value={dataFinalParam}
                />
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Form.Label className="text-end fw-bold small text-secondary">
              RELATÓRIO DE COLETA - ASSOCIAÇÃO {associacaoName}
              <br />
              RELATÓRIO EXTRAÍDO ÀS {formatarDataHora(new Date())}
            </Form.Label>
          </Col>
          <hr className="mb-4" />
        </Row>
        <Row className="w-100 my-1">
          <Col>
            <Form.Label className="w-100 text-orange">Catador:</Form.Label>
            <Form.Control
              type="text"
              className="form-control custom-focus"
              value={catadorName}
              aria-label="Disabled input exampl"
              disabled
            />
          </Col>
          <Col>
            <Form.Label className="text-orange">Função:</Form.Label>
            <Form.Label className="d-flex align-items-center text-orange">
              <Form.Control
                type="text"
                className="form-control custom-focus"
                value={funcaoName}
                aria-label="Disabled input exampl"
                disabled
              />
            </Form.Label>
          </Col>
        </Row>

        <Row className="w-100 my-3">
          <Col>
            <Form.Label className="w-100 text-orange">Rotas totais:</Form.Label>
            <Form.Control
              type="number"
              className="form-control custom-focus"
              value={rotasTotais}
              aria-label="Disabled input exampl"
              disabled
            />
          </Col>

          <Col>
            <Form.Label className="text-orange">
              Quantidade de residuos coletados:{" "}
            </Form.Label>
            {coletas.length > 0 ? (
              coletas.map((coleta, index) => (
                <div key={index} className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    className="form-control custom-focus"
                    style={{ width: "100px" }}
                    value={`${coleta.quantidade} kg`}
                    aria-label="Disabled input example"
                    disabled
                  />
                  <span className="mx-2">em</span>
                  <Form.Control
                    type="text"
                    className="form-control custom-focus"
                    style={{ width: "150px" }}
                    value={formatarData(coleta.dataColeta)}
                    aria-label="Disabled input example"
                    disabled
                  />
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="form-control custom-focus"
                  style={{ width: "100px" }}
                  value="0 kg"
                  aria-label="Disabled input example"
                  disabled
                />
                <span className="mx-2">em</span>
                <Form.Control
                  type="text"
                  className="form-control custom-focus"
                  style={{ width: "150px" }}
                  value={formatarData(new Date())} 
                  aria-label="Disabled input example"
                  disabled
                />
              </div>
            )}
          </Col>

        </Row>
        <Row className="w-100 my-1">
          <Col>
            {/* Novo campo para mostrar a quantidade de rotas realizadas */}
            <Form.Label className="w-100 text-orange">
              Rotas totais realizadas em todos os pontos:
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control custom-focus"
              style={{ width: "150px" }}
              value={rotasRealizadas}
              aria-label="Disabled input exampl"
              disabled
            />
          </Col>
        </Row>
        <Row className="w-100 my-1">
          <Col>
            {/* Novo campo para mostrar a quantidade de rotas realizadas */}
            <Form.Label className="w-100 text-orange">
              Rotas totais realizadas em todos os pontos:
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control custom-focus"
              style={{ width: "150px" }}
              value={rotasRealizadas}
              aria-label="Disabled input exampl"
              disabled
            />
          </Col>
        </Row>
        <Row className="w-100 my-3">
          <Col>
            <Form.Label className="w-100 text-orange">
              Veículos usados no período:
            </Form.Label>
            {veiculosUtilizados.map((veiculo, index) => (
              <div key={index} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="form-control custom-focus w-100"
                  value={veiculo}
                  aria-label="Disabled input exampl"
                  disabled
                />
                <BsCaretRightFill className="ml-2 text-orange" />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label className="text-orange">
              Quantidade total coletado
            </Form.Label>
            <Form.Control
              type="text" // Alterado o tipo para texto
              className="form-control custom-focus"
              value={`${quantidadeTotal} kg`} // Adicionado " kg" ao valor
              aria-label="Disabled input exampl"
              disabled
            />
          </Col>
          <div className="mt-5 d-flex center justify-content-evenly">
          <Modal show={showCheckModal} onHide={() => setShowCheckModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Escolha do Relatório</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check
              type="checkbox"
              label="Relatório Completo"
              checked={completo}
              onChange={() => setCompleto(!completo)}
            />
          </Modal.Body>
          <Modal.Footer>

          <Button variant="primary btn-blue" onClick={() => setShowCheckModal(false)}>
              Fechar
            </Button>
            <Button variant="primary btn-orange" onClick={handleDownloadPDF}>
              Baixar
            </Button>
          </Modal.Footer>
        </Modal>


            <Button
              type="submit"
              className="w-25 mx-2 btn-orange"
              onClick={handleConfirmPDF}
            >
              <BsDownload /> Baixar
            </Button>
            <Button
              type="submit"
              className="w-25 mx-2 outline-white"
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

export default RelatorioColeta;
