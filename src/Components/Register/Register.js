import React, { useState,Component } from 'react';
import {Modal,Button,Container ,Row,Col, Form} from 'react-bootstrap';
import '../Game.css';
 
class Register extends React.Component {

 constructor(props){
    super(props);
    this.state = {
        name : ''
    }
 }

 handleChange = (e) =>{
   this.setState ({
    name: e.target.value
   })
 }

 
render(){
    return (
        <>   
          <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Please, Register Your Name:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name :</Form.Label>
                <Form.Control type="text" name='name' onChange={this.handleChange} value={this.state.name} placeholder="Enter Name" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => this.props.handleSubmit(this.state.name)}>
                    Register
                </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
 
}

export default Register;