import React, { useState, useEffect } from "react";
import './UserProfile.css'
import SingleUser from "./SingleUser";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const UserProfiles = (props) => {
  const [UserData, setUserData] = useState([])
  const [UserId, setUserId] = useState('');
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [ModalShow, SetModalShow] = useState(false);
  const [Seccuss, setSeccuss] = useState('')

  //For data Fetch

  const FetchData = () => {
    fetch('http://localhost:3000/profiles/')
      .then((response) => response.json())
      .then((json) => setUserData(json));
  };

  //for data add

  const DataPost = (AddProfile) => {
    fetch('http://localhost:3000/profiles/', {
      method: 'POST',
      body: JSON.stringify(AddProfile),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  //******** */

  useEffect(() => {
    FetchData();
  }, []);


  //New Entry
  const AddProfile = () => {
    SetModalShow(true);

  }
  const ModalClose = () => {
    SetModalShow(false);
    setSeccuss('')
  }

  const EnterId = (event) => {
    setUserId(event.target.value)
    setSeccuss('')
  }

  const EnterName = (event) => {
    setUserName(event.target.value)
    setSeccuss('')
  }
  const EnterEmail = (event) => {
    setUserEmail(event.target.value)
    setSeccuss('')
  }





  //console.log(IdList)

  //const kk = IdList.includes(55);
  //console.log(kk)

  const AddProfileEntry = (event) => {



    //***for stop page reload***
    event.preventDefault();

    const IdList = UserData.map(e => e.id)
      
    (IdList.includes(55) == false) ? (
      alert('hi')
    ) : (
      alert('by')
    )



    const newEntry = {
      id: Number(UserId),
      name: UserName,
      email: UserEmail
    }
    DataPost(newEntry)
    setSeccuss('move')
    setUserId('')
    setUserName('')
    setUserEmail('')
    //setUserData(...UserData,newEntry)
    const UpdateData = [newEntry, ...UserData]
    setUserData(UpdateData)
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
                    <input type="number" value={UserId} min="1" max="100" placeholder="Id" onChange={EnterId} required />
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <input type="text" value={UserName} placeholder="Name" onChange={EnterName} required />
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <input type="email" value={UserEmail} placeholder="Email" onChange={EnterEmail} required />
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <Button type="submit" className="custom_btn">Add</Button>
                  </fieldset>
                </div>
                <label className={(Seccuss.length > 0 ? 'message-show' : 'message-hide')}>New Profile Seccussfully Added</label>
              </div>
            </form>
          </Modal.Body>

        </Modal>


      </div>
    </div>



  </>
}
export default UserProfiles;