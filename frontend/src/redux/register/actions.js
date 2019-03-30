import {ACTIONS} from "../constans";
import {emit, on} from "../../helpers/SocketAPI";

export const subscribeRegister = () => dispatch => {
	on('register', (data) => {
		if (data.error) {
			return dispatch({
				type: ACTIONS.USER.REGISTER.FL,
				data: data.error
			});
		}

		dispatch({
			type: ACTIONS.USER.REGISTER.SC,
			data
		});
	})
};

export const emitRegister = (login, password, confirmPassword) => dispatch => {
	dispatch({type: ACTIONS.USER.REGISTER.RQ});
	emit('register', {login, password, confirmPassword});
};