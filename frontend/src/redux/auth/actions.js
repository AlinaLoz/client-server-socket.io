import {ACTIONS} from "../constans";
import {emit, on} from "../../helpers/SocketAPI";

export const subscribeLogin = () => dispatch => {
  on('login', (data) => {
    if (data.error) {
      return dispatch({
        type: ACTIONS.USER.LOGIN.FL,
        data: data.error
      });
    }
    dispatch({
      type: ACTIONS.USER.LOGIN.SC,
      data
    });
  })
};

export const emitLogin = (login, password) => dispatch => {
  dispatch({type: ACTIONS.USER.LOGIN.RQ});
  emit('login', {login, password});
};

export const subscribeAuth = () => dispatch => {
  on('error', (error) => {
  });

  on('auth', (data) => {
    dispatch({
      type: ACTIONS.USER.AUTH,
      data
    });
  })
};

export const emitAuth = () => dispatch => {
  emit('auth', {test: "params"});
};


export const subscribeLogOut = () => dispatch => {
  on('logout', (data) => {
    if (data.error) {
      return;
    }
    dispatch({
      type: ACTIONS.USER.LOGOUT,
      data
    });
  })
};

export const emitLogOut = () => dispatch => {
  emit('logout');
};


