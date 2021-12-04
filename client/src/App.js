import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState();
  const [apiDbResponse, setApiDbResponse] = useState();

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(ex => console.log(ex));
  }

  const callAPIDb = () => {
    fetch("http://localhost:9000/testDB")
      .then(res => res.text())
      .then(res => setApiDbResponse(res))
      .catch(ex => console.log(ex));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => {e.preventDefault(); callAPI(); callAPIDb();}}
        >
          Learn React
        </a>
        <div>
          {apiResponse}
        </div>
        <div>
          {apiDbResponse}
        </div>
      </header>
    </div>
  );
}

export default App;
