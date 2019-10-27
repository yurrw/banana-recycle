import React, { PropTypes } from 'react';

export default class Main extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const username = this._username.value;
		const password = this._password.value;
		const email = this._email.value;
		// console.log(username);
		this.props.actions.criaUsuario(username, password, email);
	}

	additionalText() {		
		if ( this.props.caduser.isFetching ) {
			console.log(this.props.caduser.isFetching);	
			return <i className="fas fa-circle-notch fa-spin" />;
		}
		return <span style={{color: "red"}}>{this.props.caduser.message}</span>;
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
					Novo usuário
				</span>
				<hr></hr>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<input type="text" className="form-control fmctFA"
						placeholder="&#xf2b6;   e-mail" ref={(node) => this._email = node} />
					</div>
					<div className="form-group">
						<input type="text" className="form-control fmctFA"
						placeholder="&#xf007;   usuário" ref={(node) => this._username = node} />
					</div>
					<div className="form-group">
						<input type="password" className="form-control fmctFA"
						placeholder="&#xf084;   senha" ref={(node) => this._password = node} />
						
					</div>
					<div className="row">
						<div className="col-md-12">
							<button 
								type="submit" 
								className="loginbt btn btn-default btn-block">
								Cadastrar
							</button>
						</div>
						<br></br>
						<br></br>
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
	caduser: PropTypes.object.isRequired
};