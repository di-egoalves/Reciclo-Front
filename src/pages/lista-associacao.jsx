import {
  Badge,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
  Modal,
  Form,
  FormLabel,
  Dropdown,
} from "react-bootstrap";
import InputMask from "react-input-mask";
import {
  BsFilePlus,
  BsPen,
  BsPeopleFill,
  BsPlusCircleFill,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import "../style/css.css";
import { useEffect } from "react";
import { Autenticacao } from "../config/Autenticacao";
import React, { useState } from "react";

import { toast } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../services/api";

const AdicionarAssociacao = (props) => {
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [associacoes, setAssociacoes] = useState([]);
  const [etnias, setEtnias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [selectedAssociacao, setSelectedAssociacao] = useState("");
  const [selectedEtnia, setSelectedEtnia] = useState("");
  const [selectedGenero, setSelectedGenero] = useState("");
  const [visualSelectedAssociacao, setVisualSelectedAssociacao] = useState("");
  const [visualSelectedEtnia, setVisualSelectedEtnia] = useState("");
  const [visualSelectedGenero, setVisualSelectedGenero] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    const fetchData = async (url, setterFunction) => {
      try {
        const response = await API.get(url);
        setterFunction(response.data);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
  }, []);

  const handleSubmit = () => {
    const dataToSend = {
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
      cnpj: cnpj,
      bairro: bairro,
      endereco: endereco,
    };
    console.log(dataToSend);

    API.post("/associacoes", dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Associacao criado com sucesso:", response.data);
          setNome("");
          setEmail("");
          setPassword("");
          setCnpj("");
          setTelefone("");
          setBairro("");
          setEndereco("");
          toast.success("Associacao criado com sucesso!");
          props.onHide();
          window.location.reload();
        } else {
          console.error("Resposta inválida ao criar associacao:", response);
          toast.error(
            "Erro ao criar associacao. Resposta inválida do servidor."
          );
        }
      })

      .catch((error) => {
        console.error("Erro ao criar associacao:", error.response.data);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar associacao.";

        toast.error(`Erro ao criar associacao: ${errorMessage}`);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EF7A2A" }}>Criar Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label className="text-orange">Nome Completo</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Form.Label className="text-orange">CNPJ</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="99.999.999/0009-99"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />

          <Form.Label className="text-orange">E-mail</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label className="text-orange">Telefone</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <Form.Label className="text-orange">Bairro</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <Form.Label className="text-orange">Endereço</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          className="rounded btn-orange w-100"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function EditarAssociacao(props) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");

  const [associacao, setAssociacao] = useState(null);

  const [associacaoSelecionadoId, setassociacaoSelecionadoId] = useState(
    props.associacaoId
  );

  useEffect(() => {
    const fetchData = async (url, setterFunction) => {
      try {
        const response = await API.get(url);
        setterFunction(response.data);

        setNome(response.data.user.name);
        setCnpj(response.data.cnpj);
        setEmail(response.data.user.email);
        setTelefone(response.data.user.phone);
        setBairro(response.data.bairro);
        setEndereco(response.data.endereco);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData(`/associacoes/${props.associacaoId}`, setAssociacao);
  }, [props.associacaoId]);

  const handleSubmit = () => {
    const dataToSend = {
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
      cnpj: cnpj,
      bairro: bairro,
      endereco: endereco,
    };
    console.log(dataToSend);
    console.log(props.associacaoId);
    API.put(`/associacoes/${props.associacaoId}`, dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Associacao atualizado com sucesso:", response.data);
          toast.success("Associacao atualizado com sucesso");
          props.onHide();

          setAssociacao(response.data);
          window.location.reload();
          console.log("Após a atualização do estado associacao:", associacao);
        } else {
          console.error("Resposta inválida ao atualizar associacao:", response);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar associacao:", error);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar associacao.";

        toast.error(`Erro ao criar Associacao: ${errorMessage}`);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EF7A2A" }}>
          Editar Associacao
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label className="text-orange">Nome Completo</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Form.Label className="text-orange">CNPJ</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />

          <Form.Label className="text-orange">E-mail</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label className="text-orange">Telefone</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <Form.Label className="text-orange">Bairro</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <Form.Label className="text-orange">Endereço</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          className="rounded btn-orange w-100"
          onClick={handleSubmit}
        >
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ListarAssociacoes() {
  const [associacaoData, setAssociacaoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [associacaoSelecionadoId, setassociacaoSelecionadoId] = useState(null);
  const [modalAdicionarShow, setModalAdicionarShow] = useState(false);
  const [modalEditarShow, setModalEditarShow] = useState(false);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [associacaoParaExcluir, setAssociacaoParaExcluir] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  console.log(associacaoData);

  const handleExcluirAssociacao = (associacaoId) => {
    API.delete(`/associacoes/${associacaoId}`)
      .then((response) => {
        if (response && response.status === 200) {
          toast.success("Associacao excluída com sucesso!");
          setAssociacaoData((prevAssociacoes) =>
            prevAssociacoes.filter(
              (associacao) => associacao.id !== associacaoId
            )
          );
          // Atualizar a lista de associacoes após a exclusão (pode ser necessário recarregar a página ou obter novamente os dados)
        } else {
          console.error("Resposta inválida ao excluir a:", response);
          toast.error(
            "Erro ao excluir associacao. Resposta inválida do servidor."
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir associacao:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao excluir associacao.";
        toast.error(`Erro ao excluir associacao: ${errorMessage}`);
      });
  };

  const ConfirmacaoModal = ({ show, onHide, onConfirm, mensagem }) => {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{mensagem}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-orange" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="danger" className="btn-orange" onClick={onConfirm}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const filteredAssociacoes = associacaoData
    ? associacaoData.filter((associacao) => {
        const searchString = searchQuery.toLowerCase();
        return (
          associacao.user.name.toLowerCase().includes(searchString) ||
          associacao.cnpj.includes(searchString) ||
          associacao.user.email.toLowerCase().includes(searchString)
        );
      })
    : [];

  const handleExcluirConfirmacao = (associacaoId) => {
    setAssociacaoParaExcluir(associacaoId);
    setShowConfirmacaoModal(true);
  };

  const handleConfirmarExclusao = () => {
    handleExcluirAssociacao(associacaoParaExcluir);
    setShowConfirmacaoModal(false);
  };

  const handleCancelarExclusao = () => {
    setAssociacaoParaExcluir(null);
    setShowConfirmacaoModal(false);
  };

  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    API.get("/associacoes", config)
      .then((response) => {
        setAssociacaoData(response.data);

        if (!showSuccessMessage) {
          toast.success("Associacoes listadas com sucesso!");
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter os dados do associacao:", error);
        toast.error(
          "Erro ao criar associacao. Verifique os dados e tente novamente."
        );
      });
  }, [searchQuery]);

  const [modalShow, setModalShow] = React.useState(false);

  // Função para paginar os resultados
  const paginateResults = (data, page, resultsPerPage) => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Definimos a quantidade de resultados por página
  const resultsPerPage = 5;

  // Filtramos os resultados da página atual
  const currentResults = associacaoData
    ? paginateResults(associacaoData, currentPage, resultsPerPage)
    : [];

  // Calculamos o número total de páginas
  const totalPages = associacaoData
    ? Math.ceil(associacaoData.length / resultsPerPage)
    : 0;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
        <Col
          md={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            ADMINISTRADOR
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            CATADOR
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            ASSOCIAÇÃO
          </Button>
          <Button type="submit" className="rounded-5 btn-orange p-3 mb-2 mx-2">
            <BsPeopleFill size={20} className="m-2" />
            OP. LOGÍSTICO
          </Button>
        </Col>
        <hr className="m-4" />
        <Col
          md={12}
          className="d-flex align-items-center justify-content-between"
        >
          <InputGroup className="w-75">
            <FormControl
              className="custom-focus"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="btn-orange" id="button-addon2">
              <BsSearch className="" /> Buscar
            </Button>
          </InputGroup>
          <Button
            type="submit"
            className="btn-orange"
            onClick={() => setModalAdicionarShow(true)}
          >
            <BsPlusCircleFill /> Adicionar
          </Button>
          <AdicionarAssociacao
            show={modalAdicionarShow}
            onHide={() => setModalAdicionarShow(false)}
          />
        </Col>
        <Col>
          <h3 className="m-3" style={{ color: "#EF7A2A" }}>
            Lista de Associações
          </h3>
          <ListGroup as="ol" numbered>
            {paginateResults(
              filteredAssociacoes,
              currentPage,
              resultsPerPage
            ).map((associacao, index) => (
              <ListGroup.Item
                key={index}
                action
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{associacao.user.name}</div>
                  CNPJ: {associacao.cnpj} <br />
                  Email: {associacao.user.email}
                </div>
                <div>
                  <ConfirmacaoModal
                    show={showConfirmacaoModal}
                    onHide={handleCancelarExclusao}
                    onConfirm={handleConfirmarExclusao}
                    mensagem="Tem certeza que deseja excluir essa associacao?"
                  />

                  <Button
                    type="submit"
                    className="mx-2 btn-orange"
                    onClick={() => {
                      setassociacaoSelecionadoId(associacao.id);
                      setModalEditarShow(true);
                    }}
                  >
                    <BsPen /> Editar
                  </Button>
                  <Button
                    type="submit"
                    className="btn-orange"
                    onClick={() => handleExcluirConfirmacao(associacao.id)}
                  >
                    <BsTrash /> Excluir
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {associacaoSelecionadoId && (
            <EditarAssociacao
              show={modalEditarShow}
              onHide={() => setModalEditarShow(false)}
              associacaoId={associacaoSelecionadoId}
            />
          )}
          <Pagination className="pagination-orange mt-3 justify-content-center">
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage > 1 ? prevPage - 1 : prevPage
                )
              }
            >
              Anterior
            </Pagination.Prev>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < totalPages ? prevPage + 1 : prevPage
                )
              }
            >
              Próxima
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default ListarAssociacoes;
