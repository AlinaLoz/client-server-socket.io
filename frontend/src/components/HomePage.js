import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {connect} from "react-redux";
import Navbar from "./Sidebar";
import Profile from "./Profile";
import Team from "./TeamChange";
import ListTeams from "./ListTeams";
import ListBoards from "./ListBoards";
import Board from "./Board";
import {emitAuth, subscribeAuth, subscribeLogOut} from "../redux/auth/actions";
import {TeamCreate} from "./TeamCreate";

class HomePage extends React.Component {
	intervalAuth = null;

	componentWillMount() {
		const {onSubscribeAuth, onSubscribeLogOut} = this.props;
		onSubscribeAuth();
		onSubscribeLogOut();
	}

	componentDidMount() {
		const {onEmitAuth} = this.props;
		onEmitAuth();
		//this.intervalAuth = setInterval(() => onfetchAuth(), 5000);
	}

	render() {
		const {auth} = this.props;

		return (
			<React.Fragment>
				{auth && <Navbar/>}
				<Switch>
					<Route path='/register' component={Register}/>
					{!auth && <Route component={Login}/>}
					<Route path={'/profile'} component={Profile} />
					<Route path={'/team/change'} component={TeamCreate}/>
					<Route path={'/team/:id'} component={Team}/>
					<Route path={'/team'} component={ListTeams} />
					<Route path={'/board/change'} component={Board}/>
					<Route path={'/board'} component={ListBoards}/>
				</Switch>
			</React.Fragment>
		)
	}
}

export default withRouter(
	connect(
		state => ({
			auth: state.auth.auth
		}),
		dispatch => ({
			onSubscribeAuth: () => dispatch(subscribeAuth()),
			onSubscribeLogOut: () => dispatch(subscribeLogOut()),
			onEmitAuth: () => dispatch(emitAuth())
		})
	)(HomePage)
);


