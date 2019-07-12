import { UPDATE_CHALLANGES } from '../constants/action_types';
const config  = require('../../config');

function updateChallenges(data) {
    return {
        type: UPDATE_CHALLANGES,
        data
    }
}

function getChallengesFromAPI(){
    var url = config.backend_url+'challenge';

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
        let challenges = [];
        
        response.forEach(function(challenge) {
            let auxArray = [];
            auxArray['id'] = challenge._id;
            auxArray['name'] = challenge.name;
            auxArray['challenge'] = challenge.challenge;
            auxArray['points'] = challenge.points;
            let challengeRes = [];
            challenge.responses.forEach(function(res) {
                let auxArrayRes = [];
                auxArrayRes['id'] = res._id;
                auxArrayRes['correct'] = res.correct;
                auxArrayRes['description'] = res.description;
                challengeRes.push(auxArrayRes);
            });
            auxArray['responses'] = challengeRes;
            challenges.push(auxArray);
        });
        return challenges;
    });
}

export default function updateChallengesFromApi(){
    return function (dispatch) {
        return getChallengesFromAPI().then(
            challenges => dispatch(updateChallenges(challenges))
        );
    };
}
