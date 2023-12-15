import React, { useState } from "react";
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
    BsEyeFill,
} from "react-icons/bs";
import "../style/css.css";
import axios from "axios";
import { useEffect } from "react";
import { Autenticacao } from "../config/Autenticacao";

import "bootstrap/dist/css/bootstrap.min.css";

const Adicionar = (props) => {
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "#EF7A2A" }}>
                    Adiconar Formulario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="w-100 my-1">
                    <Form>
                        <Form.Group>
                            <Form.Label className="text-orange">Associação </Form.Label>
                            <Form.Control type="text" className="form-control custom-focus" />
                        </Form.Group>
                    </Form>
                </Row>

                <Row className="w-100 my-3">
                    <Col>
                        <Form.Label className="w-100 text-orange">Rota</Form.Label>
                        <Form.Control type="number" className="form-control custom-focus" />
                    </Col>
                    <Col>
                        <Form.Label className="text-orange">
                            Quantidade de residíduos coletados:{" "}
                        </Form.Label>
                        <Form.Label className="d-flex align-items-center text-orange">
                            <Form.Control
                                type="number"
                                className="form-control custom-focus"
                            />
                        </Form.Label>
                    </Col>
                </Row>

                <Row className="w-100 my-3">
                    <Form>
                        <Form.Label className="text-orange">Tipo de Veículo: </Form.Label>
                        <Dropdown className="w-100">
                            <Dropdown.Toggle
                                className="w-100 outline-white"
                                id="dropdown-basic"
                            >
                                {" "}
                                Selecionar o tipo de veículo{" "}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100 ">
                                <Dropdown.Item href="#/action-1">Triciclo</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Caminhão</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Carroça</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Row>
                <Row className="w-100 my-3">
                    <Col>
                        <Form.Label className="text-orange">
                            {" "}
                            Todos os pontos foram visitados?{" "}
                        </Form.Label>

                        <Dropdown className="w-100">
                            <Dropdown.Toggle
                                className="w-100 outline-white"
                                id="dropdown-basic"
                            >
                                {" "}
                                Selecione aqui{" "}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100 ">
                                <Dropdown.Item href="#/action-1">Sim</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Não</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Form.Label className="text-orange">
                            {" "}
                            Foi feito a coleta em todos os pontos?{" "}
                        </Form.Label>

                        <Dropdown className="w-100">
                            <Dropdown.Toggle
                                className="w-100 outline-white"
                                id="dropdown-basic"
                            >
                                {" "}
                                Selecione aqui{" "}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100 ">
                                <Dropdown.Item href="#/action-1">Sim</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Não</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row className="w-100 my-3">
                    <Form>
                        <Form.Label className="text-orange"> Motivo </Form.Label>
                        <Form.Control type="text" className="form-control custom-focus" />
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    className="rounded btn-orange w-100"
                    onClick={props.onHide}
                >
                    {" "}
                    Enviar{" "}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const Visualizar = (props) => {
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Row className="w-100 my-1">
                    <Form>
                        <Form.Group>
                            <Form.Label className="text-orange">Nome do Catador: </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control custom-focus"
                                placeholder="Fualno de tal"
                                aria-label="Disabled input exampl"
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Row>

                <Row className="w-100 my-3">
                    <Col>
                        <Form.Label className="w-100 text-orange">Rota</Form.Label>
                        <Form.Control
                            type="number"
                            className="form-control custom-focus"
                            placeholder="3 rotas"
                            aria-label="Disabled input exampl"
                            disabled
                        />
                    </Col>
                    <Col>
                        <Form.Label className="text-orange">
                            Quantidade de residíduos coletados:{" "}
                        </Form.Label>
                        <Form.Label className="d-flex align-items-center text-orange">
                            <Form.Control
                                type="number"
                                className="form-control custom-focus"
                                placeholder="0 kg"
                                aria-label="Disabled input exampl"
                                disabled
                            />
                        </Form.Label>
                    </Col>
                </Row>

                <Row className="w-100 my-3">
                    <Form>
                        <Form.Label className="text-orange">Tipo de Veículo: </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control custom-focus"
                            placeholder="Triciclo"
                            aria-label="Disabled input exampl"
                            disabled
                        />
                    </Form>
                </Row>
                <Row className="w-100 my-3">
                    <Col>
                        <Form.Label className="text-orange">
                            {" "}
                            Todos os pontos foram visitados?{" "}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control custom-focus"
                            placeholder="Sim"
                            aria-label="Disabled input exampl"
                            disabled
                        />
                    </Col>
                    <Col>
                        <Form.Label className="text-orange">
                            {" "}
                            Foi feito a coleta em todos os pontos?{" "}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control custom-focus"
                            placeholder="Não"
                            aria-label="Disabled input exampl"
                            disabled
                        />
                    </Col>
                </Row>

                <Row className="w-100 my-3">
                    <Form>
                        <Form.Label className="text-orange"> Motivo </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control custom-focus"
                            placeholder="O motivo fica aqui"
                            aria-label="Disabled input exampl"
                            disabled
                        />
                    </Form>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

function ListaVenda() {
    const [catadorData, setCatadorData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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
        axios
            .get(
                "http://18.219.127.240:3000/api/v1/catadores/pega-catadores/associacao",
                config
            )
            .then((response) => {
                setCatadorData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao obter os dados do catador:", error);
            });
    }, []);

    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [modalAdicionar, setModalAdicionar] = useState(false);

    const showModalVisualizar = () => setModalVisualizar(true);
    const hideModalVisualizar = () => setModalVisualizar(false);

    const showModalAdicionar = () => setModalAdicionar(true);
    const hideModalAdicionar = () => setModalAdicionar(false);

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
                    className="d-flex align-items-center justify-content-between"
                >
                    <InputGroup className="w-75">
                        <FormControl
                            className="custom-focus"
                            placeholder="Pesquisar"
                            aria-label="Pesquisar"
                            aria-describedby="basic-addon2"
                        />
                        <Button type="submit" className="btn-orange" id="button-addon2">
                            <BsSearch className="" /> Buscar
                        </Button>
                    </InputGroup>
                    <Button
                        type="submit"
                        className="btn-orange"
                        onClick={showModalAdicionar}
                    >
                        <BsPlusCircleFill /> Adicionar
                    </Button>

                    <Adicionar show={modalAdicionar} onHide={hideModalAdicionar} />
                </Col>
                <Col>
                    <h3 className="m-3" style={{ color: "#EF7A2A" }}>
                        Formularios
                    </h3>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Numero da Coleta</div>
                                Data da Coleta: 00/00/000 <br />
                                Quantidade Coletada: 0
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="btn-orange"
                                    onClick={showModalVisualizar}
                                >
                                    <BsEyeFill /> Visualizar
                                </Button>
                                <Visualizar
                                    show={modalVisualizar}
                                    onHide={hideModalVisualizar}
                                />

                            </div>
                        </ListGroup.Item>

                        {/* 
                        {currentResults.map((catador, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className='ms-2 me-auto'>
                                    <div className="fw-bold">{catador.user.name}</div>
                                    CPF: {catador.cpf} <br />
                                    Email: {catador.user.email}
                                </div>
                                <div>
                                    <Button type='submit' className="mx-2 btn-orange" >
                                        <BsPen /> Editar
                                    </Button>
                                    <Button type='submit' className="btn-orange" >
                                        <BsTrash /> Excluir
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                        */}
                    </ListGroup>

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

export default ListaVenda;
