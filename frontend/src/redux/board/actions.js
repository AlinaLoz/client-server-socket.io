import {emit, on} from "../../helpers/SocketAPI";
import {ACTIONS} from "../constans";

export const subscribeGetBoards = () => dispatch => {
  on('get-all-boards', (data) => {
    if (data.errors) {
      return dispatch({
        type: ACTIONS.BOARD.GET_ALL.FL,
        data: data.errors
      });
    }
    dispatch({
      type:ACTIONS.BOARD.GET_ALL.SC,
      data: data
    })
  })
};

export const emitGetBoards = () => dispatch => {
  dispatch({type: ACTIONS.BOARD.GET_ALL.RQ});
  emit('get-all-boards');
};

export const subscribeCreateBoard = () => dispatch => {
  on('create-board', (data) => {
    if (data.errors) {
      return dispatch({
        type: ACTIONS.BOARD.CREATE.FL,
        data: data.errors
      });
    }
    dispatch({
      type:ACTIONS.BOARD.CREATE.SC,
      data: data
    })
  })
};

export const emitCreateBoard = (name, isTeamBoard, idTeam) => dispatch => {
  dispatch({type: ACTIONS.BOARD.CREATE.RQ});
  emit('create-board', {name, isTeamBoard, idTeam});
};

export const subscribeDropBoard = () => dispatch => {
  on('drop-board', (data) => {
    if (data.errors) {
      return dispatch({
        type: ACTIONS.BOARD.DROP.FL,
        data: data.errors
      });
    }
    dispatch({
      type:ACTIONS.BOARD.DROP.SC,
      data: data
    })
  })
};

export const emitDropBoard = (idBoard) => dispatch => {
  dispatch({type: ACTIONS.BOARD.DROP.RQ});
  emit('drop-board', {idBoard});
};

export const dropMessage = (id) => dispatch => {
  dispatch({type: ACTIONS.BOARD.MESSAGE,});
};