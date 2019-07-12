import { UPDATE_CHALLANGES, UPDATE_USERS } from '../constants/action_types';

const initialState = {
    challenges: [],
    users:      [],
};

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_CHALLANGES) {
        return Object.assign({}, state, {
            challenges: action.data
        })
    }
    if (action.type === UPDATE_USERS) {
        return Object.assign({}, state, {
            users: action.data
        })
    }
    return state;
}

export default rootReducer;