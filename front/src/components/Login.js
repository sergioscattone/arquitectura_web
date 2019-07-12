import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
const config  = require('../config');


class LoginComponent extends Component {
    constructor() {
        super();
        this.username = React.createRef();
        this.password = React.createRef();
        this.login = this.login.bind(this);
        this.isLogged = localStorage.getItem('token')
    }

    login() {
        var url = config.backend_url+'login';

        var init = {
            method: 'POST',
            
            headers: {
                'Access-Control-Allow-Origin': config.frontend_url,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.username.current.value,
                "password": this.password.current.value
            }),
        }
        return fetch(url, init)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            localStorage.setItem('token', response.token);
            window.location.reload();
        });
    }

    render() {
        if (!this.isLogged) {
            return (
            <div>
                <div className="login">
                    <h1>LOGIN</h1>
                    <input  ref={this.username} type="text" name="username" placeholder="Nombre de Usuario" />
                    <input ref={this.password}  type="password" name="username" placeholder="Password" />
                    <button onClick={this.login}>ENVIAR</button>
                </div>
            </div>
            );
        } else {
            return (
                <div className="App">
                    <BrowserRouter>
                        <Route exact path='/' component={Home}/>
                    </BrowserRouter>
                </div>
            )
        }
    }
}

export default LoginComponent;