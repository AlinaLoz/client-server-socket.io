import React from 'react';
import {Icon, Segment, Sidebar, Menu} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {emitLogOut, subscribeLogOut} from "../redux/auth/actions";

const NavbarComponent = ({history, onEmitLogOut}) => {
	return (
		<Sidebar visible className={'page-tasks__sidebar navbar'}>
			<Segment basic>
				<Menu.Item as={'a'} onClick={() => history.push('/')}>
					{/*<ReactSVG src={require('../assets/images/logo.svg')}/>*/}
					<span>Tododer</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/profile')}>
					<Icon name='user'/>
					<span>Профиль</span>
					<Icon name={`log out`} onClick={() => onEmitLogOut()}/>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/team')}>
					<Icon name='group'/>
					<span>Команды</span>
				</Menu.Item>
				<Menu.Item as={'a'} onClick={() => history.push('/board')}>
					<Icon name='clipboard'/>
					<span>Доски</span>
				</Menu.Item>
			</Segment>
		</Sidebar>
	)
};


export default withRouter(connect(
	state => ({}),
	dispatch => ({
		onEmitLogOut: () => dispatch(emitLogOut())
	}),
)(NavbarComponent));