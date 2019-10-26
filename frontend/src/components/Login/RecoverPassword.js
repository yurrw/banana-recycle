import React, { PropTypes } from 'react';

export default class RecoverPassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isFetching: false, message: "", status: "" };
	}

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();

		const email = this._email.value;

		this.setState({isFetching: true});

		// Call action
		this.props.resetPassword(email, this.onSuccess.bind(this), this.onError.bind(this));

	}

	onSuccess() {
		this.setState({isFetching: false, message: "Credenciais enviadas com sucesso!", status: "SUCCESS"});
		//this._currentPw.value = "";
		//this._newPw.value = "";
		//this._confirmPw.value = "";
		//this._email = "";
	}

	onError() {
		this.setState({isFetching: false, message: "E-mail não encontrado na base de dados.", status: "ERROR"});
	}

	additionalText() {
		if ( this.state.isFetching ) return <i className="fas fa-circle-notch fa-spin" />;
		return <span style={{color: this.state.status === "SUCCESS" ? "green" : "red"}}>{this.state.message}</span>;
	}

	render () {
		return (
			<div className="container login-box cs-card">
				<h2 className="text-center">Recuperar conta</h2>
				<hr />
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>E-mail de cadastro</label>
						<input type="text" className="form-control" ref={(node) => this._email = node} />
					</div>
					<button
						type="submit"
						disabled={this.state.isFetching}
						className="btn btn-primary">
						Enviar
					</button>
					<span style={{padding: "10px"}}>
						{this.additionalText()}
					</span>
				</form>
			</div>
		);
	}

}

RecoverPassword.propTypes = {
	resetPassword: PropTypes.func.isRequired
};