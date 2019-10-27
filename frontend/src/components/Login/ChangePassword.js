import React, { PropTypes } from 'react';

export default class ChangePassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isFetching: false, message: "", status: "" };
	}

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const currPw = this._currentPw.value;
		const newPw = this._newPw.value;
		const confirmPw = this._confirmPw.value;

		if ( newPw !== confirmPw ) {
			this.setState({status: "ERROR", message: "Senhas não conferem!"});
			return;
		}

		this.setState({isFetching: true});

		// Call action
		this.props.changePassword(newPw, currPw, this.onSuccess.bind(this), this.onError.bind(this));
	}

	onSuccess() {
		this.setState({isFetching: false, message: "Alteração feita com sucesso!", status: "SUCCESS"});
		this._currentPw.value = "";
		this._newPw.value = "";
		this._confirmPw.value = "";
	}

	onError() {
		this.setState({isFetching: false, message: "Senha incorreta", status: "ERROR"});
	}

	additionalText() {			
		if ( this.state.isFetching ) return <i className="fas fa-circle-notch fa-spin " />;
		return <span style={{color: this.state.status === "SUCCESS" ? "green" : "red"}}>{this.state.message}</span>;
	}

	render () {
		return (
			<div className="container login-box cs-card">
				<div className="login-top">
					<div className="cs-card-Top">
						<center><img src="Boy_Happy.png" width="100" /></center>
						<div className="LogoTrashBoy">
							<center><img src="TrashPay.png" width="100" /></center>
						</div>
					</div>
				</div>
				<br></br>
				<span className="NewUserText">
					Trocar Senha
				</span>
				<hr></hr>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>Senha Atual</label>
						<input type="password" className="form-control" ref={(node) => this._currentPw = node} />
					</div>
					<div className="form-group">
						<label>Nova Senha</label>
						<input type="password" className="form-control" ref={(node) => this._newPw = node} />
					</div>
					<div className="form-group">
						<label>Confirme a Nova Senha</label>
						<input type="password" className="form-control" ref={(node) => this._confirmPw = node} />
					</div>					
					<button 
						type="submit"
						disabled={this.state.isFetching}
						className="loginbt btn btn-default btn-block">
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

ChangePassword.propTypes = {
	changePassword: PropTypes.func.isRequired
};