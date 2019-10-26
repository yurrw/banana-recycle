import React, { PropTypes } from 'react';

// Components
import Navbar from './Navbar';

export default class Main extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isRedirecting: false };
	}

	componentWillMount() {
		// this.setState.({projects: this.props.login.projectaccess});
		if ( this.props.login.credentials.token === null ) {
			this.setState({isRedirecting: true});
			this.props.router.push('/login');
		} else this.props.actions.isTokenValid();
	}

	setPermissionState(valor) {
		// console.log("teste");
		this.setState({projects: valor});

	}

	render () {
		const content = this.props.login.isFetching || this.state.isRedirecting
			? <center><i className="fas fa-circle-notch fa-spin fa-fw" /></center>
			: this.props.children;
// 
		// console.log("o valor recebido é : " + this.props.login.projectaccess);
		// this.setPermissionState.bind(this.props.login.projectaccess);
		// console.log("o outro valor recebido : ", this.state.projects);
		
		return (
			<div>
				<Navbar 
					username={this.props.login.credentials.username} 
					logout={this.props.actions.logout} 
					pathname={this.props.location.pathname}
					projectaccess={this.props.login.projectaccess}
					choosenbyuser={this.props.login.choosenbyuser}
					setChoosenByUser={this.props.actions.setChoosenByUser}
				/>
				<div className="container">
					{content}
				</div>
			</div>
		);
	}
}

Main.propTypes = {
	router: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	login: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired
};