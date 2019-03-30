import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input, Grid, Message, Icon} from "semantic-ui-react";
import {emitRegister, onRegister, subscribeRegister} from "../redux/register/actions";

class Register extends Component {
	state = {
		login: "",
		password: "",
		confirmPassword: "",
	};

	onChange = (type, e) => {
		this.setState({
			[type]: e.target.value
		});
	};

	componentDidMount() {
		const {onSubscribeRegister} = this.props;
		onSubscribeRegister();
	}

	register = (e) => {
		e.preventDefault();
		const {login, password, confirmPassword} = this.state;
		const {onEmitRegister} = this.props;
		onEmitRegister(login, password, confirmPassword);
	};

	componentWillReceiveProps(nextProps) {
		const {message} = nextProps;
		if (this.props.message !== message && !message.negative) {
			this.props.history.push('/auth');
		}
	}

	render() {
		const {login, password, confirmPassword} = this.state;
		const {message} = this.props;

		return (
			<Grid className={'page-form register'}>
				<Button className="button-back button__back" onClick={() => this.props.history.push('/')}>back</Button>
				<div>
					<Message hidden={!Object.keys(message).length || !message.negative} content={message.text}/>
					<form>
						<Input className="login" type="email" onChange={this.onChange.bind(this, "login")}>
							<Icon name="user"/>
							<input pattern={`^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`} type="email"/>
						</Input>
						<Input className="password" type="password" onChange={this.onChange.bind(this, "password")}>
							<Icon name="lock"/>
							<input type="password"/>
						</Input>
						<Input className="password" type="password" onChange={this.onChange.bind(this, "confirmPassword")}>
							<Icon name="lock"/>
							<input type="password"/>
						</Input>
						<Button className="button__login" disabled={!login || !password || !confirmPassword} onClick={this.register}>register</Button>
					</form>
				</div>
			</Grid>
		)
	}
}


export default connect(
	state => ({
		message: state.register.message || {},
	}),
	dispatch => ({
		onEmitRegister: (login, password, confirmPassword) => dispatch(emitRegister(login, password, confirmPassword)),
		onSubscribeRegister  : () => dispatch(subscribeRegister())
	})
)(Register);