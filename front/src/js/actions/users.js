import { UPDATE_USERS } from '../constants/action_types';
const config  = require('../../config');

function updateUsers(data) {
    return {
        type: UPDATE_USERS,
        data
    }
}

function getUsersFromAPI(){
    var url = config.backend_url+'user';

    var init = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': config.frontend_url
        }
    }
    return fetch(url, init)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        let users = [];
        response.forEach(function(challenge) {
            let auxArray = [];
            auxArray['id'] = challenge._id;
            auxArray['first_name'] = challenge.first_name;
            auxArray['last_name'] = challenge.last_name;
            auxArray['username'] = challenge.username;
            auxArray['points'] = challenge.points;
            auxArray['role'] = challenge.role;
            users.push(auxArray);
        });
        users.sort((a, b) => (a.points < b.points) ? 1 : -1)
        return users;
    });
}

export default function updateUsersFromApi(){
    return function (dispatch) {
        return getUsersFromAPI().then(
            users => dispatch(updateUsers(users))
        );
    };
}