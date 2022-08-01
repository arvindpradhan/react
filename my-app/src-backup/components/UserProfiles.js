import React, { useState, useEffect } from "react";
import './UserProfile.css'
import SingleUser from "./SingleUser";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserProfiles = (props) => {

  const [UserData, setUserData] = useState([])

  const getData = () => {
    fetch('http://localhost:3000/profiles/')
      .then((response) => response.json())
      .then((json) => setUserData(json));
  };

  useEffect(() => {
    getData();
  }, []);


  //New Entry

  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [ModalShow, SetModalShow] = useState(false);
  const [Seccuss, setSeccuss]=useState('')

  const EnterName = (event) => {
    setUserName(event.target.value)
    setSeccuss('')
  }
  const EnterEmail = (event) => {
    setUserEmail(event.target.value)
    setSeccuss('')
  }

  const AddProfile = () => {
    SetModalShow(true);
    
  }
  const ModalClose = () => {
    SetModalShow(false);
    setSeccuss('')
  }

  const AddProfileEntry = (event) => {

    //***for stop page reload***
    event.preventDefault();
    //*************************/

   // document.getElementById('responce_message').style.display = 'none';

    const newEntry = {
      name: UserName,
      email: UserEmail
    }

    fetch('http://localhost:3000/profiles/', {
      method: 'POST',
      body: JSON.stringify(newEntry),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => getData())

    setSeccuss('move')
    setUserName('')
    setUserEmail('')

  }

  return <>
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="pb-5">
            <h1>User Profiles</h1>
          </div>
        </div>
        <div className="col-md-12">
          <div className="add_profile mb-3 text-end">
            <button className="custom_btn" onClick={AddProfile}>Add Profile</button>
          </div>
        </div>
        <div className="col-md-12">
          <div className="profile_box">
            <table className="table m-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  UserData.slice(0, 20).map((item) => {
                    return <SingleUser key={item.id}
                      id={item.id}
                      name={item.name}
                      email={item.email}
                    />
                  })

                }
              </tbody>
            </table>

          </div>
        </div>
        <Modal show={ModalShow} onHide={ModalClose} className="profile_modal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={AddProfileEntry}>
              <div className="row">
                <div className="col-md-12">
                  <fieldset>
                    <input type="text" value={UserName} placeholder="Name" onChange={EnterName} required/>
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <input type="email" value={UserEmail} placeholder="Email" onChange={EnterEmail} required/>
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <Button type="submit" className="custom_btn">Add</Button>
                  </fieldset>
                </div>
                <label className={(Seccuss.length>0?'message-show':'message-hide')}>New Profile Seccussfully Added</label>
              </div>
            </form>
          </Modal.Body>
          {/* <Modal.Footer>
               
             </Modal.Footer> */}
        </Modal>


      </div>
    </div>



  </>
}
export default UserProfiles;