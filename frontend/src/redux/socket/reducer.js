import {ACTIONS} from "../constans";

const initState = {
  io: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ACTIONS.SOCKET.SAVE:
      return {...state, io: action.data};
    default:
      return state;
  }
}