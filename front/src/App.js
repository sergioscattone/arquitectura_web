import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <h1>Bienvenido al sistema de preguntas y respuestas de UP !!</h1>
          <Route exact path='/' component={Login}/>
        </BrowserRouter>
      </div>
    );
}

export default App;
