import React, { Component } from 'react';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import HomePage from "./components/HomePage";
import {disconnect} from "./helpers/SocketAPI";

const store = createStore(reducer, {}, applyMiddleware(thunk));

class App extends Component {
  componentWillUnmount() {
		disconnect();
  }

  render() {
		return (
			<Provider store={store}>
				<Router>
					<HomePage/>
				</Router>
			</Provider>
	);
	}
}

export default App;