import React, { useState } from "react";
import {
  BsFillEnvelopeFill,
  BsEyeFill,
  BsEyeSlashFill,
  BsKeyFill,
} from "react-icons/bs";
import {
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
  Image,
  Button,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import telaLogin from "../images/telalogin.svg";
import "../style/css.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EsqueciSenhaModal from "../components/esqueceu-senha";

function Login() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  function onSubmit() {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://reciclo.api-reciclo.free.nf/login", data)
      .then((response) => {
        // se a resposta for 200, gera o token
        if (response.status === 200) {
          const { access_token } = response.data;

          // armazena o token
          localStorage.setItem("token", access_token);

          try {
            // decodifica o token armazenado
            const decodedToken = jwtDecode(access_token);
            const roleNames = decodedToken.roleNames;

            toast.success("Login realizado com sucesso.", {
              position: "bottom-right",
              duration: 2000,
            });
            navigate(`/perfil-${roleNames}`);
          } catch (error) {
            toast.error("Token inválido.", {
              position: "bottom-right",
              duration: 2000,
            });
          }
        } else {
          toast.error("Falha na autenticação!", {
            position: "bottom-right",
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message, {
            position: "bottom-right",
            duration: 2000,
          });
        } else {
          toast.error("Algo deu errado.", {
            position: "bottom-right",
            duration: 2000,
          });
        }

        setIncorrectPassword(true);
        console.log(error);
      });
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <Row className="border bg-white rounded-5 shadow mt-5 w-100">
          <Col sm={12} md={6} className="d-flex align-items-center justify-content-center">
            <Form className="w-75 p-3">
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <div className="input-group mb-3">
                  <div className="input-group-text btn-orange">
                    <BsFillEnvelopeFill />
                  </div>
                  <FormControl
                    className="form-control custom-focus m-0"
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <FormLabel>Senha</FormLabel>
                <div className="input-group mb-3">
                  <div className="input-group-text btn-orange">
                    <BsKeyFill />
                  </div>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    className="form-control custom-focus m-0"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="input-group-text"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </div>
                </div>
              </Form.Group>

              <Row className="d-flex justify-content-between">
                <Col className="d-flex">
                  <input
                    type="checkbox"
                    className="form-check-input custom-focus"
                    id="save-login"
                  />
                  <label className="form-check-label ml-1" htmlFor="save-login">
                    Mantenha-me conectado
                  </label>
                </Col>
                <Col className="d-flex justify-content-end">
                  <a className="text-orange" href="#" onClick={handleOpenModal}>
                    Esqueceu a senha?
                  </a>
                </Col>
              </Row>

              <Button
                className="rounded-5 btn-orange w-100 mt-4"
                onClick={onSubmit}
              >
                Entrar
              </Button>
              <EsqueciSenhaModal show={showModal} onClose={handleCloseModal} />
            </Form>
          </Col>
          <Col sm={12} md={6}>

            <Image className="p-4 w-100 h-100" src={telaLogin} alt="Tela de Login" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
