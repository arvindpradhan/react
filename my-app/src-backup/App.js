import React from "react";
import './App.css'
import UserProfiles from './components/UserProfiles.js'


const App = () => {

  const UpdateData = (getpost) => {
    try {
      fetch('http://localhost:3000/profiles/' + getpost.id, {
        method: 'PUT',
        body: JSON.stringify(getpost),
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

  return (

    <div className="App d-flex align-items-center justify-content-center flex-column">

      {/* <button onClick={'test'}>test</button> */}
      <UserProfiles />

    </div>
  );
}

export default App;
