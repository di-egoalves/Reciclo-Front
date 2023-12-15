import React from "react";
import { Container, Row } from "react-bootstrap";
import { BsEmojiDizzy } from "react-icons/bs"; //TODO: NAO ESTA SENDO UTILIZADO
import img404 from "../images/404.png";

const PaginaNaoEncontrada = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="border bg-white rounded-5 w-100 shadow mt-5 justify-content-center p-5">
        <div className="d-flex justify-content-center">
          <img src={img404} alt="404" />
        </div>
      </Row>
    </Container>
  );
};

export default PaginaNaoEncontrada;
