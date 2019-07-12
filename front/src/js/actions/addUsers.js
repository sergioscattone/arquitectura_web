const config  = require('../../config');

function addUserInApi(user){
    var url = config.backend_url+'user';
    var token = localStorage.getItem('token');

    const data = {
        first_name: user.first_name,
	    last_name: user.last_name,
	    username: user.username,
	    password: user.password
    }

    var init = {
        method: 'POST',
        body: data,
        headers: {
            'Access-Control-Allow-Origin': config.frontend_url,
            'Authorization': token,
        }
    }
    return fetch(url, init)
    .then((response) => {
        return response;
    });
}

export default function addUserApi(user){
    return function (dispatch) {
        return addUserInApi(user);
    };
}