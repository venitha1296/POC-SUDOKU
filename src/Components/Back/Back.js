import React, { useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import '../Game.css';
import { Link } from "react-router-dom";

function Back() {
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
  } 
  const handleShow = () => {
    setShow(true);
  }
 
  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Home
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            Are you sure want to quit this game?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                No
            </Button>
            <Link to="/home" className="btn btn-success">
                Yes
            </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Back;