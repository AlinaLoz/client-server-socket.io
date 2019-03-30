//import {ACTIONS} from "../constans";

import {ACTIONS} from "../constans";

const initState = {
    boards         : [],
    // messageOfDrop  : {},
    // messageOfCreate: {},
    fetching       : false,
    message        : {}
};

export default function teams(state = initState, action) {
    switch (action.type) {
        case ACTIONS.BOARD.GET_ALL.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.GET_ALL.SC:
            return {...state, ...action.data, fetching: false, message: {negative: false}};
        case ACTIONS.BOARD.GET_ALL.FL:
            return {...state, fetching: false, message: {info: action.data, negative: true}};

        case ACTIONS.BOARD.CREATE.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.CREATE.SC:
            return {...state, ...action.data, fetching: false, message: {negative: false}};
        case ACTIONS.BOARD.CREATE.FL:
            return {...state, fetching: false, message: {info: action.data, negative: true}};
        case ACTIONS.BOARD.MESSAGE:
            return {...state, message: {}};
        case ACTIONS.BOARD.DROP.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.DROP.SC:
            const {id} = action.data;
            const {boards} = state;
            const obj = boards.find(b => id == b.id);
            if (boards.indexOf(obj) !== -1) {
                boards.splice(boards.indexOf(obj), 1);
            }
            return {...state, ...action.data, boards: [...boards], fetching: false, message: {negative: false}};
        case ACTIONS.BOARD.DROP.FL:
            return {...state, fetching: false,  message: {info: action.data, negative: true}};

        default:
            return state;
    }
}