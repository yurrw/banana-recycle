import React, { PropTypes } from 'react';
import 'react-select/dist/react-select.css';

export default class AppContainer extends React.Component {

	componentWillMount() {
		// Do pre-checks
	}

	render() {
		return (
			// Put all app's global styles here
			<div>
				{this.props.children}
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.object.isRequired
};