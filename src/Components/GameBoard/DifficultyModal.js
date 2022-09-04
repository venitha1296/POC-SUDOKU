import React, { useState } from 'react';
import {Modal,Button,Container ,Row,Col} from 'react-bootstrap';
import '../Game.css';
import store from '../../Reducer/Store';
import { Link } from "react-router-dom";

function DifficultyModal(props) {
  const [show, setShow] = useState(false);
  const [status,setStatus] = useState(0);

  const handleClose = () =>{
    setShow(false);
  } 
  const handleShow = () => {
    setShow(true);
  }
 
  const difficultyClick = (event) => {
    event.preventDefault();
    let difficulty = event.target.getAttribute('data-difficulty');
    store.dispatch({type: difficulty});
    setStatus(1);   
  }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        START GAME
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Hi {props.name}, Please choose the difficulty:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Button variant="info" data-difficulty="easy" onClick={difficultyClick}>
                Easy
                </Button>
              </Col>
              <Col xs={6} md={5}>
                <Button variant="info" data-difficulty="medium" onClick={difficultyClick}>
                Medium
                </Button>
              </Col>
              <Col xs={6} md={3}>
                <Button variant="info" data-difficulty="hard" onClick={difficultyClick}>
                Hard
                </Button> 
              </Col>
            </Row>
           </Container>   
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            { status ==1 && <Link to="/new-game" className="btn btn-success">
                    Play
            </Link>
            }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DifficultyModal;