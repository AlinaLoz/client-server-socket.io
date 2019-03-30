import {Xhr} from "../../helpers/Xhr";
import {ACTIONS} from "../constans";
import {emit, on} from "../../helpers/SocketAPI";

export const subscribeTeams = () => dispatch => {
    on('get-all-team', (data) => {
        if (data.errors) {
            return dispatch({
                type: ACTIONS.TEAM.GET.FL,
                data: data.errors
            });
        }
        dispatch({
            type:ACTIONS.TEAM.GET.SC,
            data: data
        })
    })
};

export const emitTeams = () => dispatch => {
    dispatch({type: ACTIONS.TEAM.GET.RQ});
    emit('get-all-team');
};

export const subscribeCheckUser = () => dispatch => {
    on('check-user', (data) => {
        if (data.errors) {
            return  dispatch({
                type: ACTIONS.TEAM.USER_TEST.FL,
                data: data.errors
            });
        }
        dispatch({
            type: ACTIONS.TEAM.USER_TEST.SC,
            data
        })
    });
};
export const emitCheckUser = (login) => dispatch => {
    dispatch({type: ACTIONS.TEAM.USER_TEST.RQ});
    emit('check-user', {login});
};

export const subscribeCreateTeam = () => dispatch => {
    on('create-team', (data) => {
        if (data.errors) {
            return  dispatch({
                type: ACTIONS.TEAM.CREATE.FL,
                data: data.errors
            });
        }
        dispatch({
            type: ACTIONS.TEAM.CREATE.SC,
            data: data
        })
    })
};

export const emitCreateTeam = (name, users) => dispatch => {
    dispatch({type: ACTIONS.TEAM.CREATE.RQ});
    emit('create-team', {name, users});
};

export const subscribeDropTeam = () => dispatch => {
    on('drop-team', (data) => {
        if (data.errors) {
            return dispatch({
                type: ACTIONS.TEAM.DROP.FL,
                data: data.errors
            });
        }
        dispatch({
            type: ACTIONS.TEAM.DROP.SC,
            data: data
        });
    })
};

export const emitDropTeam = (id) => dispatch => {
    dispatch({type: ACTIONS.TEAM.DROP.RQ});
    emit('drop-team', {idTeam: id});
};

export const subscribeGetOneTeam = () => dispatch => {
    on('get-one-team', (data) => {
        if (data.errors) {
            return dispatch({
                type: ACTIONS.ONE_TEAM.GET.FL,
                data: data.errors
            });
        }
        dispatch({
            type: ACTIONS.ONE_TEAM.GET.SC,
            data: data.team,
        })
    })
};

export const emitGetOneTeam = (id) => dispatch => {
    emit('get-one-team', {idTeam: id});
};

export const subscribeUpdateNameTeam = () => dispatch => {
    on('update-name-team', (data) => {
        if (data.errors) {
            return dispatch({
                type: ACTIONS.ONE_TEAM.UPDATE_NAME.FL,
                data: data.errors
            });
        }
        dispatch({
            type: ACTIONS.ONE_TEAM.UPDATE_NAME.SC,
            data: data,
        });
    })
};

export const emitUpdateNameTeam = (id, name) => dispatch => {
    emit('update-name-team', {idTeam: id, name});
};

export const dropMessage = (id) => dispatch => {
    dispatch({type: ACTIONS.TEAM.MESSAGE});
};