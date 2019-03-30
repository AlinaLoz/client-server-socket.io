import auth from "./auth/reducer";
import register from "./register/reducer";
import {combineReducers} from "redux";
import tasks from "./tasks/reducer";
import teams from "./teams/reducer";
import board from "./board/reducer";
import socket from "./socket/reducer";

export default combineReducers({
	auth,
	register,
	tasks,
	teams,
	board,
	socket
});