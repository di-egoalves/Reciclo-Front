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

const AdicionarCatador = (props) => {
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [associacoes, setAssociacoes] = useState([]);
  const [etnias, setEtnias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [selectedAssociacao, setSelectedAssociacao] = useState("");
  const [selectedEtnia, setSelectedEtnia] = useState("");
  const [selectedGenero, setSelectedGenero] = useState("");
  const [selectedFuncao, setSelectedFuncao] = useState("");

  const [visualSelectedAssociacao, setVisualSelectedAssociacao] = useState("");
  const [visualSelectedEtnia, setVisualSelectedEtnia] = useState("");
  const [visualSelectedGenero, setVisualSelectedGenero] = useState("");
  const [visualSelectedFuncao, setVisualSelectedFuncao] = useState("");

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

    fetchData("/associacoes", setAssociacoes);
    fetchData("/etnia", setEtnias);
    fetchData("/genero", setGeneros);
    fetchData("/funcoes-catador", setFuncoes);
  }, []);

  const handleassociacaoChange = ({ id, user: { name } }) => {
  
    setSelectedAssociacao(id);
    setVisualSelectedAssociacao(name);
  };

  const handleEtniaChange = (event) => {
    const etnia = etnias.find((e) => e.nomenclatura === event.target.innerText);
    setSelectedEtnia(etnia ? etnia.id : "");
    setVisualSelectedEtnia(etnia ? etnia.nomenclatura : "");
  };

  const handleGeneroChange = (event) => {
    const genero = generos.find(
      (g) => g.nomenclatura === event.target.innerText
    );
    setSelectedGenero(genero ? genero.id : "");
    setVisualSelectedGenero(genero ? genero.nomenclatura : "");
  };

  const handleFuncaoChange = (event) => {
    const funcao = funcoes.find((f) => f.funcao === event.target.innerText);
    setSelectedFuncao(funcao ? funcao.id : "");
    setVisualSelectedFuncao(funcao ? funcao.funcao : "");
  };

  const handleSubmit = () => {
    const dataToSend = {
      cpf: cpf,
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
      bairro: bairro,
      endereco: endereco,
      idAssociacao: selectedAssociacao,
      idEtnia: selectedEtnia,
      idGenero: selectedGenero,
      funcaoId: selectedFuncao,
    };
    console.log(dataToSend);

    API.post("/catadores", dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Catador criado com sucesso:", response.data);
          setNome("");
          setEmail("");
          setPassword("");
          setCpf("");
          setTelefone("");
          setBairro("");
          setEndereco("");
          setSelectedAssociacao("");
          setSelectedEtnia("");
          setSelectedGenero("");
          setSelectedFuncao("");

          toast.success("Catador criado com sucesso!");
          props.onHide();
          window.location.reload();
        } else {
          console.error("Resposta inválida ao criar catador:", response);
          toast.error("Erro ao criar catador. Resposta inválida do servidor.");
        }
      })

      .catch((error) => {
        console.error("Erro ao criar catador:", error.response.data);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar catador.";

        toast.error(`Erro ao criar catador: ${errorMessage}`);
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

          <Form.Label className="text-orange">CPF</Form.Label>
          <InputMask
            className="form-control custom-focus"
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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

          <Form.Label className="text-orange">Associação</Form.Label>
          <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100 outline-white"
                  id="dropdown-basic"
                >
                  {visualSelectedAssociacao || "Selecione uma Associacao"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {associacoes.map((associacao, index) => (
                    <Dropdown.Item key={associacao.id} onClick={() => handleassociacaoChange(associacao)}>
                      {associacao.user.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

          <Form.Label className="text-orange">Etnia</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-basic"
            >
              {visualSelectedEtnia || "Selecione uma Etnia"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {etnias.map((etnia, index) => (
                <Dropdown.Item key={index} onClick={handleEtniaChange}>
                  {etnia.nomenclatura}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label className="text-orange">Gênero</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-basic"
            >
              {visualSelectedGenero || "Selecione um Gênero"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {generos.map((genero, index) => (
                <Dropdown.Item key={index} onClick={handleGeneroChange}>
                  {genero.nomenclatura}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label className="text-orange">Função do catador</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-basic"
            >
              {visualSelectedFuncao || "Selecione uma Função"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {funcoes.map((funcao, index) => (
                <Dropdown.Item key={index} onClick={handleFuncaoChange}>
                  {funcao.funcao}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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

function EditarCatador(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [associacoes, setAssociacoes] = useState([]);
  const [etnias, setEtnias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [funcoes, setFuncoes] = useState([]);

  const [selectedAssociacao, setSelectedAssociacao] = useState("");
  const [selectedEtnia, setSelectedEtnia] = useState("");
  const [selectedGenero, setSelectedGenero] = useState("");
  const [selectedFuncao, setSelectedFuncao] = useState("");

  const [visualSelectedGenero, setVisualSelectedGenero] = useState("");
  const [visualSelectedAssociacao, setVisualSelectedAssociacao] = useState("");
  const [visualSelectedEtnia, setVisualSelectedEtnia] = useState("");
  const [selectedAssociacaoCatador, setSelectedAssociacaoCatador] =
    useState("");
  const [selectedAssociacaoId, setSelectedAssociacaoId] = useState("");
  const [selectedAssociacaoName, setSelectedAssociacaoName] = useState("");
  const [selectedGeneroId, setSelectedGeneroId] = useState("");
  const [selectedEtniaName, setSelectedEtniaName] = useState("");
  const [selectedGeneroName, setSelectedGeneroName] = useState("");
  const [selectedFuncaoName, setSelectedFuncaoName] = useState("");

  const [catador, setCatador] = useState(null);

  const [catadorSelecionadoId, setCatadorSelecionadoId] = useState(
    props.catadorId
  ); // Utilizando o ID do catador passado como prop

  useEffect(() => {
    const fetchData = async (url, setterFunction) => {
      try {
        const response = await API.get(url);
        setterFunction(response.data);
        const catadorAssociacao = response.data.associacao;
        const catadorEtnia = response.data.etnia;
        const catadorGenero = response.data.genero;
        const catadorFuncao = response.data.funcoescatador;

        setNome(response.data.user.name);
        setCpf(response.data.cpf);
        setEmail(response.data.user.email);
        setTelefone(response.data.user.phone);
        setBairro(response.data.bairro);
        setEndereco(response.data.endereco);

        setSelectedAssociacaoId(catadorAssociacao.id);
        setSelectedAssociacaoName(catadorAssociacao.user.name);
        setSelectedEtnia(catadorEtnia.id);
        setSelectedEtniaName(catadorEtnia.nomenclatura);

        setSelectedGenero(catadorGenero.id);
        setSelectedGeneroName(catadorGenero.nomenclatura);

        setSelectedFuncao(catadorFuncao.id);
        setSelectedFuncaoName(catadorFuncao.funcao);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData(`/catadores/${props.catadorId}`, setCatador);
    fetchData("/associacoes", setAssociacoes);
    fetchData("/etnia", setEtnias);
    fetchData("/genero", setGeneros);
    fetchData("/funcoes-catador", setFuncoes);
  }, [props.catadorId]);

  const handleAssociacaoChange = (event) => {
    const associacao = associacoes.find(
      (a) => a.user.name === event.target.innerText
    );
    setSelectedAssociacaoId(associacao ? associacao.id : "");
    setSelectedAssociacaoName(associacao ? associacao.user.name : "");
  };

  const handleEtniaChange = (event) => {
    const etnia = etnias.find((e) => e.nomenclatura === event.target.innerText);
    setSelectedEtnia(etnia ? etnia.id : "");
    setSelectedEtniaName(etnia ? etnia.nomenclatura : "");
  };

  const handleGeneroChange = (event) => {
    const genero = generos.find(
      (g) => g.nomenclatura === event.target.innerText
    );
    setSelectedGenero(genero ? genero.id : "");
    setSelectedGeneroName(genero ? genero.nomenclatura : "");
  };

  const handleFuncaoChange = (event) => {
    const funcao = funcoes.find((f) => f.funcao === event.target.innerText);
    setSelectedFuncao(funcao ? funcao.id : "");
    setSelectedFuncaoName(funcao ? funcao.funcao : "");
  };

  const handleSubmit = () => {
    const dataToSend = {
      cpf: cpf,
      user: {
        name: nome,
        email: email,
        phone: telefone,
        status: true,
      },
      bairro: bairro,
      endereco: endereco,
      associacaoId: selectedAssociacaoId,
      idEtnia: selectedEtnia,
      idGenero: selectedGenero,
      funcaoId: selectedFuncao,
    };
    console.log(dataToSend);
    console.log(props.catadorId);
    API.put(`/catadores/${props.catadorId}`, dataToSend)
      .then((response) => {
        if (response && response.data) {
          console.log("Catador atualizado com sucesso:", response.data);
          toast.success("Catador atualizado com sucesso");
          props.onHide();

          setCatador(response.data);
          window.location.reload();
          console.log("Após a atualização do estado catador:", catador);
        } else {
          console.error("Resposta inválida ao atualizar catador:", response);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar catador:", error);
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao criar catador.";

        toast.error(`Erro ao criar catador: ${errorMessage}`);
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
        <Modal.Title style={{ color: "#EF7A2A" }}>Editar Catador</Modal.Title>
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

          <Form.Label className="text-orange">CPF</Form.Label>
          <FormControl
            className="form-control custom-focus"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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
          <Form.Label className="text-orange">Associação</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-assoc"
            >
              {selectedAssociacaoName || "Selecione uma Associação"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {associacoes.map((associacao, index) => (
                <Dropdown.Item key={index} onClick={handleAssociacaoChange}>
                  {associacao.user.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Label className="text-orange">Etnia</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-etnia"
            >
              {selectedEtniaName || "Selecione uma Etnia"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {etnias.map((etnia, index) => (
                <Dropdown.Item key={index} onClick={handleEtniaChange}>
                  {etnia.nomenclatura}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label className="text-orange">Gênero</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-basic"
            >
              {selectedGeneroName || "Selecione um Gênero"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {generos.map((genero, index) => (
                <Dropdown.Item key={index} onClick={handleGeneroChange}>
                  {genero.nomenclatura}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label className="text-orange">Função</Form.Label>
          <Dropdown className="w-100">
            <Dropdown.Toggle
              className="w-100 outline-white"
              id="dropdown-basic"
            >
              {selectedFuncaoName || "Selecione uma Função"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {funcoes.map((funcao, index) => (
                <Dropdown.Item key={index} onClick={handleFuncaoChange}>
                  {funcao.funcao}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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

function ListarCatadores() {
  const [catadorData, setCatadorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [catadorSelecionadoId, setCatadorSelecionadoId] = useState(null); // Adicionando estado para o ID do catador selecionado
  const [modalAdicionarShow, setModalAdicionarShow] = useState(false);
  const [modalEditarShow, setModalEditarShow] = useState(false);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  // Estado para armazenar o ID do catador a ser excluído
  const [catadorParaExcluir, setCatadorParaExcluir] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Adicione esta linha

  console.log(catadorData);

  const handleExcluirCatador = (catadorId) => {
    API.delete(`/catadores/${catadorId}`)
      .then((response) => {
        if (response && response.status === 200) {
          toast.success("Catador excluído com sucesso!");
          setCatadorData((prevCatadores) =>
            prevCatadores.filter((catador) => catador.id !== catadorId)
          );
          // Atualizar a lista de catadores após a exclusão (pode ser necessário recarregar a página ou obter novamente os dados)
        } else {
          console.error("Resposta inválida ao excluir catador:", response);
          toast.error(
            "Erro ao excluir catador. Resposta inválida do servidor."
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir catador:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro desconhecido ao excluir catador.";
        toast.error(`Erro ao excluir catador: ${errorMessage}`);
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

  const filteredCatadores = catadorData
    ? catadorData.filter((catador) => {
        const searchString = searchQuery.toLowerCase();
        return (
          catador.user.name.toLowerCase().includes(searchString) ||
          catador.cpf.includes(searchString) ||
          catador.user.email.toLowerCase().includes(searchString)
        );
      })
    : [];

  const handleExcluirConfirmacao = (catadorId) => {
    setCatadorParaExcluir(catadorId);
    setShowConfirmacaoModal(true);
  };

  // Função para confirmar a exclusão
  const handleConfirmarExclusao = () => {
    // Chamar a função de exclusão com o ID do catador
    handleExcluirCatador(catadorParaExcluir);
    // Esconder o modal de confirmação
    setShowConfirmacaoModal(false);
  };

  // Função para cancelar a exclusão
  const handleCancelarExclusao = () => {
    // Limpar o ID do catador
    setCatadorParaExcluir(null);
    // Esconder o modal de confirmação
    setShowConfirmacaoModal(false);
  };

  // Token de autenticação
  const autenticacao = Autenticacao();
  const token = autenticacao.token;

  // Configuração do cabeçalho com o token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // Fazendo a chamada para o backend para obter os dados do catador
    API.get("/catadores", config)
      .then((response) => {
        setCatadorData(response.data);

        if (!showSuccessMessage) {
          
          toast.success("Catadores listados com sucesso!");
          setShowSuccessMessage(true); // Atualize o estado para evitar exibir a mensagem novamente
        }
      })
      .catch((error) => {
        console.error("Erro ao obter os dados do catador:", error);
        toast.error(
          "Erro ao criar catador. Verifique os dados e tente novamente."
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
  const resultsPerPage = 2;

  // Filtramos os resultados da página atual
  const currentResults = catadorData
    ? paginateResults(catadorData, currentPage, resultsPerPage)
    : [];

  // Calculamos o número total de páginas
  const totalPages = catadorData
    ? Math.ceil(catadorData.length / resultsPerPage)
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
            CATADOR
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
          <AdicionarCatador
            show={modalAdicionarShow}
            onHide={() => setModalAdicionarShow(false)}
          />
        </Col>
        <Col>
          <h3 className="m-3" style={{ color: "#EF7A2A" }}>
            Lista de Catadores
          </h3>
          <ListGroup as="ol" numbered>
            {paginateResults(
              filteredCatadores,
              currentPage,
              resultsPerPage
            ).map((catador, index) => (
              <ListGroup.Item
                key={index}
                action
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{catador.user.name}</div>
                  CPF: {catador.cpf} <br />
                  Email: {catador.user.email}
                </div>
                <div>
                  <ConfirmacaoModal
                    show={showConfirmacaoModal}
                    onHide={handleCancelarExclusao}
                    onConfirm={handleConfirmarExclusao}
                    mensagem="Tem certeza que deseja excluir este catador?"
                  />

                  <Button
                    type="submit"
                    className="mx-2 btn-orange"
                    onClick={() => {
                      setCatadorSelecionadoId(catador.id);
                      setModalEditarShow(true);
                    }}
                  >
                    <BsPen /> Editar
                  </Button>
                  <Button
                    type="submit"
                    className="btn-orange"
                    onClick={() => handleExcluirConfirmacao(catador.id)}
                  >
                    <BsTrash /> Excluir
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {catadorSelecionadoId && (
            <EditarCatador
              show={modalEditarShow}
              onHide={() => setModalEditarShow(false)}
              catadorId={catadorSelecionadoId}
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

export default ListarCatadores;
