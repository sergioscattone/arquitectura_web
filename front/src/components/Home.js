import { connect } from 'react-redux';
import React, { Component } from 'react';

import store from './../js/store/index';
import updateChallengesFromApi from './../js/actions/challenges';
import updateUsersFromApi from './../js/actions/users';

const mapStateToProps = state => {
    return { 
        users: state.users,
        challenges: state.challenges
    };
}

class HomeComponent extends Component {
    constructor(){
        super();
        setInterval(function(){
            store.dispatch(updateChallengesFromApi())
            store.dispatch(updateUsersFromApi())
        }, 1000);
        this.logout = this.logout.bind(this);
    }

    logout () {
        localStorage.removeItem('token');
        window.location.reload();
    }

    drawResponses(responses) {
        let responesHtml = "";
        responses.forEach(el => {
            let correct = el.correct ? "Verdadera" : "Falsa";
            responesHtml = el.description + " ("+correct+") \n";
        });
        return responesHtml;
    }

    render() {
        return (
            <div>
                <div className="user-section">
                    <table className="table">
                        <tr>
                            <th colSpan="6" className="header">USUARIOS</th>
                        </tr>
                        <tr>
                            <th>Puntos</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>ID en MongoDB</th>
                        </tr>
                        {this.props.users.map(el => (
                        <tr>
                            <td>{el.points}</td>
                            <td>{el.username}</td>
                            <td>{el.role}</td>
                            <td>{el.first_name}</td>
                            <td>{el.last_name}</td>
                            <td>{el.id}</td>
                        </tr>
                        ))}
                    </table>
                    <br />
                    <hr />
                    <br />
                </div>

                <div className="user-section">
                    <table className="table">
                        <tr>
                            <th colSpan="5" className="header">DESAFÍOS</th>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Puntos</th>
                            <th>Respuestas</th>
                            <th>ID en MongoDB</th>
                        </tr>
                        {this.props.challenges.map(el => (
                        <tr>
                            <td>{el.name}</td>
                            <td>{el.challenge}</td>
                            <td>{el.points}</td>
                            <td>
                            {this.drawResponses(el.responses)}
                            </td>
                            <td>{el.id}</td>
                        </tr>
                        ))}
                    </table>
                </div>
                <button className="logout" onClick={this.logout}>SALIR</button>
            </div>
        );
    }
}

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;