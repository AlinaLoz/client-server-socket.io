import {ACTIONS} from "../constans";

export const socketSave = (io) => dispatch => {
  dispatch({
    type: ACTIONS.SOCKET.SAVE,
    io
  });
};