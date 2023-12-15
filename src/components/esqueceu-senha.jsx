import React, { useState } from "react";
import { Modal, Form, FormControl, Button } from "react-bootstrap";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { API } from "../services/api";

function EsqueciSenhaModal({ show, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await API.get("/users");
      const usuarios = response.data;

      const isEmailRegistered = usuarios.some(
        (usuario) => usuario.email === email
      );

      if (isEmailRegistered) {
        await API.post("/esqueceu-senha", { email });

        toast.success(
          "Instruções de recuperação de senha enviadas para o email.",
          {
            position: "bottom-right",
            duration: 2000,
          }
        );
        onClose();
      } else {
        toast.error("O email informado não está cadastrado.", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao enviar as instruções de recuperação de senha.",
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#EF7A2A" }} className="text-orange">
          Recupere sua senha!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <h6 className="mt-2 mb-2 text-orange">
            Informe o e-mail de cadastro e enviaremos as instruções para você
            recuperar sua senha
          </h6>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <div className="input-group">
              <div className="input-group-text btn-orange">
                <BsFillEnvelopeFill />
              </div>
              <FormControl
                className="form-control custom-focus"
                type="email"
                placeholder="Digite o e-mail cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Group>
        </Form>
        <div className="d-grid gap-2 w-100">
          <Button
            type="submit"
            className="rounded btn-orange w-100 mb-1"
            onClick={handleSubmit}
          >
            Recuperar senha
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EsqueciSenhaModal;
