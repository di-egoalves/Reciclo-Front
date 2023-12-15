import React, { useState, useEffect } from "react";
import { BsKeyFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function RedefinirSenha() {
    const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log("Token:", token); // Verifique se o token está sendo capturado corretamente
  }, [token]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          `https://reciclo.api-reciclo.free.nf/resetar-senha/${token}`,
          { password: password }
        );

        if (response.status >= 200 && response.status < 300) {
          toast.success("Senha redefinida com sucesso.", {
            position: "bottom-right",
            duration: 2000,
          });
          navigate("/");
        } else {
          console.log(response.status)
          toast.error("Falha ao redefinir senha.", {
            position: "bottom-right",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Erro na chamada de API:", error);
        toast.error("Erro ao redefinir senha.", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("As senhas não coincidem. Por favor, digite novamente.", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
      <Row className="border bg-white rounded-5 shadow mt-5 w-100">
        <Col className="d-flex align-items-center justify-content-center">
          <Form className="w-75 p-3">
            <h2 className="text-center text-orange mb-4">Redefinir Senha</h2>

            <Form.Group>
              <Form.Label>Nova Senha</Form.Label>
              <div className="input-group mb-3">
                <div className="input-group-text btn-orange">
                  <BsKeyFill />
                </div>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  className="form-control custom-focus m-0"
                  placeholder="Digite sua nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-text" onClick={handlePasswordVisibility}>
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirmar Nova Senha</Form.Label>
              <div className="input-group mb-3">
                <div className="input-group-text btn-orange">
                  <BsKeyFill />
                </div>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  className="form-control custom-focus m-0"
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="input-group-text" onClick={handlePasswordVisibility}>
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </div>
              </div>
            </Form.Group>

            <Button className="rounded-5 btn-orange w-100 mt-4" onClick={handleSubmit}>
              Redefinir Senha
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RedefinirSenha;
