import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import {
  BsEyeSlashFill,
  BsKeyFill,
  BsEyeFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import fotoAdmin from "../images/imgadmin.png";
import fotoAssociacao from "../images/imgassociacao.png";
import fotoCatador from "../images/imgcatador.png";
import fotoOperadorLogistico from "../images/imgopeadorlogistico.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Autenticacao } from "../config/Autenticacao";

import "../style/css.css";
import { API } from "../services/api";

function MudarSenha(props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmarSenhaChange = (event) => {
    setConfirmarSenha(event.target.value);
  };

  const handleSubmitSenha = async (event) => {
    event.preventDefault();

    const autenticacao = Autenticacao();
    const token = autenticacao.token;
    console.log("Token:", token);

    console.log(senha);
    if (senha === confirmarSenha) {
      try {
        //TODO: MUDEI PARA USAR O AXIOS, VERIFIQUE SE ESTA FUNCIONADO DA MESMA FORMA
        const response = await API.put(
          "/users/update/password",
          {
            password: senha,
          },
          {
            headers: {
              "Content-Type": "application/json", //TODO: GERALMENTE NÃO PRECISA DEFINIR O CONTENT-TYPE
              //POIS CREIO QUE POR DEFAULT O AXIOS JA SEJA ESSE CONTENT-TYPE
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //TODO: NAO PRECISA DO IF, POIS QUANDO CAI NO TRY, ELE JA SERÁ UM 200
        if (response.status === 200) {
          toast.success("Senha alterada com sucesso");
          setSenha("");
          setConfirmarSenha("");
          props.onHide();
          console.log("Senha alterada com sucesso!");
        } else {
          console.error("Erro ao alterar a senha:", response.statusText);
          toast.error("Erro ao mudar senha");
        }
      } catch (error) {
        console.error("Erro na chamada de API:", error);
        if (error.response) {
          console.error("Erro de resposta:", error.response.data);
        } else if (error.request) {
          console.error("Erro de requisição:", error.request);
        } else {
          console.error("Erro:", error.message);
        }
        toast.error("Erro ao mudar senha");
      }
    } else {
      console.log("As senhas não coincidem. Por favor, digite novamente.");
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-orange">Alterar Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className="text-orange my-2">
              Digite sua nova senha
            </Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-text btn-orange">
                <BsKeyFill />
              </div>
              <FormControl
                type={showPassword ? "text" : "password"}
                className="form-control custom-focus m-0"
                placeholder="Digite sua senha"
                value={senha}
                onChange={handleSenhaChange}
              />
              <div
                className="input-group-text"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </div>
            </div>

            <Form.Label className="text-orange my-2">
              Confirme sua senha
            </Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-text btn-orange">
                <BsKeyFill />
              </div>
              <FormControl
                type={showPassword ? "text" : "password"}
                className="form-control custom-focus m-0"
                placeholder="Digite sua senha"
                value={confirmarSenha}
                onChange={handleConfirmarSenhaChange}
              />
              <div
                className="input-group-text"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-orange" onClick={handleSubmitSenha}>
            Mudar senha
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function MudarEmail(props) {
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmarEmailChange = (event) => {
    setConfirmarEmail(event.target.value);
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();

    const autenticacao = Autenticacao();
    const token = autenticacao.token;

    if (email === confirmarEmail) {
      //TODO: MUDEI PARA USAR O AXIOS, VERIFIQUE SE ESTA FUNCIONADO DA MESMA FORMA

      try {
        const response = await API.put(
          "/users/update/email",
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json", //TODO: GERALMENTE NÃO PRECISA DEFINIR O CONTENT-TYPE
              //POIS CREIO QUE POR DEFAULT O AXIOS JA SEJA ESSE CONTENT-TYPE
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //TODO: NAO PRECISA DO IF, POIS QUANDO CAI NO TRY, ELE JA SERÁ UM 200
        if (response.status === 200) {
          toast.success("email alterado com sucesso");
          setEmail("");
          setConfirmarEmail("");

          props.onHide();
          console.log("Email alterado com sucesso!");
        } else {
          console.error("Erro ao alterar o email:", response.statusText);
        }
      } catch (error) {
        toast.error("erro ao alterar o email");
        console.error("Erro na chamada de API:", error);
      }
    } else {
      toast.error("Os emails não coincidem. Por favor, digite novamente.");
      console.log("Os emails não coincidem. Por favor, digite novamente.");
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-orange">Alterar Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className="text-orange my-2">
              Digite seu novo e-mail
            </Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-text btn-orange">
                <BsFillEnvelopeFill />
              </div>
              <FormControl
                className="form-control custom-focus m-0"
                placeholder="Digite seu novo e-mail"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <Form.Label className="text-orange my-2">
              Confirme seu e-mail
            </Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-text btn-orange">
                <BsFillEnvelopeFill />
              </div>
              <FormControl
                className="form-control custom-focus m-0"
                type="email"
                placeholder="Confirme seu novo e-mail"
                value={confirmarEmail}
                onChange={handleConfirmarEmailChange}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-orange" onClick={handleSubmitEmail}>
            Mudar email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Perfil() {
  const [mudarSenha, setMudarSenha] = useState(false);
  const [mudarEmail, setMudarEmail] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    navigate(-1);
  };

  const decodedToken = jwtDecode(localStorage.getItem("token"));
  let userName = decodedToken.name.split(" ")[0];
  let func = decodedToken.roleNames[0];

  const fotoPerfil = {
    admin: fotoAdmin,
    associacao: fotoAssociacao,
    catador: fotoCatador,
    operadorlogistico: fotoOperadorLogistico,
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Row className="border bg-white rounded-5 shadow mt-5 w-100 justify-content-center p-5">
          <div className="text-center d-flex flex-column align-items-center">
            <Image
              src={fotoPerfil[func]} // Selecionar a imagem correta com base em 'func'
              roundedCircle
              alt="Foto de Perfil"
              className="img-fluid perfil"
            />
            <h3 className="text-orange">{userName} </h3>
            <p className="mb-3 text-orange">{func.toUpperCase()}</p>

            <Button
              type="submit"
              className="btn-orange rounded-5 w-25 p-2 mt-1"
              onClick={() => setMudarEmail(true)}
            >
              Alterar E-mail
            </Button>
            <MudarEmail show={mudarEmail} onHide={() => setMudarEmail(false)} />

            <Button
              type="submit"
              className="btn-orange rounded-5 w-25 p-2 mt-1"
              onClick={() => setMudarSenha(true)}
            >
              Alterar Senha
            </Button>
            <MudarSenha show={mudarSenha} onHide={() => setMudarSenha(false)} />

            <Button
              type="submit"
              className="outline-white rounded-5 w-25 p-2 mt-4"
              onClick={handleGoBack}
            >
              Voltar
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Perfil;
