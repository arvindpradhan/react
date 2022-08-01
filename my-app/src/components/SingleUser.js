import React, { useState, useEffect } from "react";
import './SingleUser.css'

import Button from "react-bootstrap/esm/Button";
import { Modal } from "react-bootstrap";

const SingleUser = (props) => {

  const [Id, setId] = useState(props.id)
  const [NewName, setNewName] = useState(props.name)
  const [email, setemail] = useState(props.email)


  const LatestData = () => {
    fetch(`http://localhost:3000/profiles/${Id}`)
      .then((response) => response.json())
      .then((json) => {
        setNewName(json.name)
        setemail(json.email)
      });
  };

  const ChangeTitle = (event) => {
    setNewName(event.target.value)
  }
  const ChangeEmail = (event) => {
    setemail(event.target.value)
  }

  //Modal Part

  //state
  const [show, setShow] = useState(false);

  //for close button
  const handleClose = () => {
    setShow(false);
    LatestData()
  }

  //for edit btn
  const handleShow = () => {
    setShow(true);
  }

  //for update button

  const update = (event) => {
    setShow(false);
    const updateEntry = {
      id: Id,
      name: NewName,
      email: email
    }
    try {
      fetch(`http://localhost:3000/profiles/${updateEntry.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateEntry),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(json => alert('Update Seccuss'))
    } catch (error) {
      alert(error)
    }

  }

  //delete Entry

  const DeleteEntry=()=>{
  }

  return <>
    <tr>
      <th scope="row">{props.id}</th>
      <td>{NewName}</td>
      <td>{email}</td>
      <td className="text-end d-flex justify-content-end gap-2">
        <Button className="custom_btn" variant="primary" onClick={handleShow}>Edit</Button>
        {/* <Button className="custom_btn" onClick={DeleteEntry}>Delete</Button> */}
      </td>    
    </tr>
    <Modal show={show} onHide={handleClose} centered className="custom_modal" backdrop="static">
      <Modal.Header>
        <div className="px-3 pt-3">
          <div className="id_box">ID : {props.id}</div>
        </div>
      </Modal.Header>
      <Modal.Body className="">
        <div className="row align-items-center">
          <div className="col-md-12">
            <fieldset>
              <input type="text" value={NewName} onChange={ChangeTitle}></input>
            </fieldset>
          </div>
          <div className="col-md-12">
            <fieldset>
              <input type="email" value={email} onChange={ChangeEmail}></input>
            </fieldset>
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer className="align-items-center justify-content-center">
        <Button className="custom_btn" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="custom_btn" variant="primary" onClick={update}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  </>







}
export default SingleUser;