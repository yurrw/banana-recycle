import React, { PropTypes } from 'react';

export default class Main extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const username = this._username.value;
		const password = this._password.value;

		this.props.actions.getToken(username, password);
	}

	additionalText() {		
		if ( this.props.login.isFetching ) {
			console.log(this.props.login.isFetching);	
			return <i className="fas fa-circle-notch fa-spin" />;
		}
		return <span style={{color: "red"}}>{this.props.login.message}</span>;
	}

	render () {
		return (
			<div className="container login-box cs-card">
				<center><img src="biobodylogo.png" width="100" /></center>
				<hr />
				<div className="login-title">
					Liberacao de Exames
				</div>
				<hr />
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>Usuário</label>
						<input type="text" className="form-control" ref={(node) => this._username = node} />
					</div>
					<div className="form-group">
						<label>Senha</label>
						<input type="password" className="form-control" ref={(node) => this._password = node} />
						<p />
						<a href="recover_password" >Esqueceu a conta?</a>
					</div>
					<div className="row">
						<div className="col-md-3">
							<button 
								type="submit" 
								className="btn btn-default">
								Entrar
							</button>
						</div>
						<div className="col-md-9" style={{paddingTop: "7px"}}>
							<span>
								{this.additionalText()}
							</span>
						</div>	
					</div>					
				</form>
			</div>
		);
	}
}

Main.propTypes = {
	actions: PropTypes.object.isRequired,
	login: PropTypes.object.isRequired
};