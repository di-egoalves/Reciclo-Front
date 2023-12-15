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
} from "react-bootstrap";
import "../style/css.css";
import {
  BsArrowLeftShort,
  BsDownload,
  BsEyeFill,
  BsCaretRightFill,
} from "react-icons/bs"; //TODO:  'BsEyeFill' NÃO ESTA SENDO USADO
import { useLocation, useNavigate } from "react-router-dom";
import { Autenticacao } from "../config/Autenticacao";
import { id } from "date-fns/locale";
import { API } from "../services/api";
import html2pdf from 'html2pdf.js';
import ResumoVenda from "../models/resumoVendas";

function RelatorioVendaAdm() {
  const [associacaoName, setAssociacaoName] = useState("");
  const [materiaisVendidos, setMateriaisVendidos] = useState([]);
  const [quantidadeMateriaisVendidos, setQuantidadeMateriaisVendidos] =
    useState(0); //TODO:  'STATE E SETSTATE' NÃO ESTA SENDO USADO
  const [pesoTotalComercializado, setPesoTotalComercializado] = useState(0); //TODO:  'STATE E SETSTATE' NÃO ESTA SENDO USADO
  const [idAssociacao, setIdAssociacao] = useState("");
   const [showCheckModal, setShowCheckModal] = useState(false);

  const [completo, setCompleto] = useState(false); //TODO:  'SETSTATE' NÃO ESTA SENDO USADO

  const navigate = useNavigate();
  const location = useLocation();
  const vendas = location.state?.vendas || [];
  const associacaoInfo = location.state.associacaoInfo || {};
  const dataInicialParam = location.state?.startDate || "";
  const dataFinalParam = location.state?.endDate || "";

  //TODO:  'formatarData' E 'formatarDataHora' PODE SER FUNCOES UNITARIAS GLOBAIS
  //POIS VI QUE VC ESTA USANDO EM VARIOS LUGARES. PODERIA CRIAR ELAS GLOBALMENTE EM UM ARQUIVO
  //E APENAS IMPORTAR-LAS
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

  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  const fetchAssociacaoInfo = async (idAssociacao) => {
    try {
      const response = await API.get(`/associacoes/${idAssociacao}`, config);
      return {
        associacaoName: response.data.user.name,
        associacaoCnpj: response.data.cnpj,
        associacaoBairro: response.data.bairro,
        associacaoEndereco: response.data.endereco,


      };
    } catch (error) {
      console.error("Erro ao obter informações do associacao:", error);
      return {

        associacaoName: "Nome da Associacão Não Disponível",

      };
    }
  };

  const fetchAssociacaoName = async (idAssociacao) => {
    try {
      const response = await API.get(`/associacoes/${idAssociacao}`, config);
      setAssociacaoName(response.data.user.name);
    } catch (error) {
      console.error("Erro ao obter nome do associacao:", error);
    }
  };

  useEffect(() => {
    const processarDados = () => {
      if (vendas && vendas.length > 0) {
        vendas.forEach((venda) => {
          const idAssociacao = venda.idAssociacao;
          fetchAssociacaoName(idAssociacao);
          setIdAssociacao(idAssociacao);
        });
      }

      const materiais = {};

      vendas.forEach((venda) => {
        venda.materiais.forEach((material) => {
          const { idMaterial, quantidadeVendida, nomeMaterial } = material;

          if (!materiais[idMaterial]) {
            materiais[idMaterial] = {
              nome: nomeMaterial,
              quantidadeVendida: 0,
              pesoTotal: 0,
            };
          }

          materiais[idMaterial].quantidadeVendida += quantidadeVendida;
          materiais[idMaterial].pesoTotal += quantidadeVendida; 
        });
      });

      setMateriaisVendidos(Object.values(materiais));



      if (associacaoInfo && associacaoInfo.id) {
        const fetchAssociacaoDetails = async () => {
          const { associacaoName } = await fetchAssociacaoInfo(associacaoInfo.id);

          setAssociacaoName(associacaoName);
        };

        fetchAssociacaoDetails();
      }
    };

    processarDados();
  }, [vendas]);

  const handleConfirmPDF = async () => {
    try {
      setShowCheckModal(true);
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
    }
  };
  

  const handleDownloadPDF = async () => {
    try {
      setShowCheckModal(false);
  
      if (!associacaoInfo || !associacaoInfo.id) {
        console.error('Informações da associacao não disponíveis.');
        return;
      }
  
      const associacaoDetails = await fetchAssociacaoInfo(associacaoInfo.id);
      const  vendasData = await Promise.all(vendas.map(async (venda) => {

        const materiaisVenda = venda.materiais || [];

        const vendaMateriais = materiaisVenda.map(material => ({
          id: material.idMaterial,
          nome: material.nomeMaterial,
          quantidade: material.quantidadeVendida,
        }));

  
        return {
          ...venda,
          associacaoData: associacaoDetails,
          materiais: vendaMateriais,

        };
      }));
  
      const materiais = vendasData.flatMap(venda => venda.materiais);


      const resumoVendas = vendasData.length > 0 ? new ResumoVenda(vendasData, materiais) : null;
  
      const pdfOptions = {
        margin: 10,
        filename: 'relatorio.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
      const pdfContentPromise = formatarColetasFrontend({
        vendas: vendasData,
        associacao: associacaoDetails,
        startDate: formatarData(dataInicialParam),
        endDate: formatarData(dataFinalParam),
        resumoVendas,
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
  

  const formatarColetasFrontend = async ({ vendas, associacao, startDate, endDate, resumoVendas }, completo) => {
  
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

    console.log("dados venda: ", vendas, associacao, startDate, endDate, resumoVendas, completo)


 const associacaoInfo = vendas.idAssociacao != null ? `
<div class="container">
  <h2>Dados de associação</h2>
  <div class="linha">
    <p><b>Associação</b>: ${associacao.associacaoName}</p>
    <p><b>CNPJ</b>: ${associacao.associacaoCnpj}</p>
  </div>
  <div class="linha">
    <p><b>Bairro</b>: ${associacao.associacaoBairro}</p>
    <p><b>Endereço</b>: ${associacao.associacaoEndereco}</p>
  </div>
</div>` : "";



let resumoMateriais = '';
resumoVendas.vendasPorMaterial.forEach((vendaPorMaterial) => {
  console.log("Nome do material:", vendaPorMaterial.nome);
  console.log("Quantidade vendida (antes):", vendaPorMaterial.quantidade);
  resumoMateriais += `<li>
    <p><b>${vendaPorMaterial.nome}</b>: ${vendaPorMaterial.quantidade} kg</p>
  </li>`}
  )

const resumo = `
    <div class="container"> 
      <h2>Resumo Vendas</h2>
      <p><b>Datas</b>: ${startDate } - ${endDate}</p>
      <p><b>Quantidade de vendas realizadas</b>: ${resumoVendas.quantidadeVendas}</p>
      <h3 class="margin-top">Total de materiais vendidos:</h3>
      <ul>
        ${resumoMateriais}
      </ul>
    </div>`;
    let main = "";

    if (completo) {
      main += '<h2>Vendas realizadas:</h2>';
      for (let venda of vendas) {

        let associacao = null;

        if (venda.idAssociacao != null) {
          associacao = await fetchAssociacaoInfo(venda.idAssociacao);
        }

        let materiais = '';
        venda.materiais.forEach(material =>{
          materiais += `<li><p><b>${material.nome}</b>: ${material.quantidade} kg</p></li>`
        })
     
        const vendaFormatada = `
      <div class="container">
        ${venda.idAssociacao != null
            ? ''
            : `
            <p><b>Nome da associação</b>: ${associacao.associacaoName}</p>
            <p><b>CNPJ da associação</b>: ${associacao.associacaoCnpj}</p>
          `}
          <p><b>Empresa compradora</b>: ${venda.empresaCompradora}</p>
          <p><b>Nota fiscal</b>: ${venda.notaFiscal}</p>
          <p><b>Data</b>: ${formatarData(venda.dataVenda, 'dd/MM/yyyy')}</p>
          <h3 class="margin-top">Materiais vendidos:</h3>
          <ul>
            ${materiais}
          </ul>
      </div>`;
        main += vendaFormatada;

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
        ${associacaoInfo}
        ${resumo}
        ${main}
      </body>
    </html>
  `;

    return conteudoPDF;
  };


  const quantidadeMateriaisVendidosNoPeriodo = materiaisVendidos.reduce(
    (total, material) => total + material.quantidadeVendida,
    0
  );
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
              RELATÓRIO DE VENDAS - ASSOCIAÇÃO {associacaoName}
              <br />
              RELATÓRIO EXTRAÍDO ÀS {formatarDataHora(new Date())}
            </Form.Label>
          </Col>
          <hr className="mb-4" />
        </Row>

        <Row className="w-100 my-3">
          <Col>
            <Form.Label className="w-100 text-orange">
              Materiais vendidos no período:
            </Form.Label>
            {materiaisVendidos.map((material, index) => (
              <div key={index} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="form-control custom-focus w-100"
                  value={material.nome}
                  aria-label="Disabled input example"
                  disabled
                />
                <BsCaretRightFill className="ml-2 text-orange" />
              </div>
            ))}
          </Col>
          <Col>
            <Form.Label className="text-orange">
              Quantidade comercializada por material:
            </Form.Label>
            {materiaisVendidos.map((material, index) => (
              <div key={index} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="form-control custom-focus w-100"
                  value={material.nome}
                  aria-label="Disabled input example"
                  disabled
                />
                <BsCaretRightFill className="ml-2 text-orange" />
                <Form.Control
                  type="text"
                  className="form-control custom-focus"
                  value={`${material.pesoTotal || "0"} kg`}
                  placeholder="0 kg"
                  aria-label="Disabled input exampl"
                  disabled
                />
              </div>
            ))}
            {materiaisVendidos.length === 0 && (
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  className="form-control custom-focus w-100"
                  value="Nenhum material vendido"
                  aria-label="Disabled input example"
                  disabled
                />
              </div>
            )}
            <Form.Label className="text-orange">
              Quantidade de materiais vendidos no período:
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control custom-focus"
              style={{ width: "120px" }}
              value={`${quantidadeMateriaisVendidosNoPeriodo || "0"} kg`}
              aria-label="Disabled input example"
              disabled
            />
          </Col>
        </Row>

        <Row>
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

export default RelatorioVendaAdm;
