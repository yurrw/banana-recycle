import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import '../styles/core.scss';
import '../styles/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class App extends React.Component {
	
	static propTypes = {
		history: PropTypes.object.isRequired,
		routes: PropTypes.element.isRequired,
		store: PropTypes.object.isRequired
	};

	render () {
		return (
			<Provider store={this.props.store}>
				<div>
					<Router history={this.props.history}>
						{this.props.routes}
					</Router>
				</div>
			</Provider>
		);
	}
}