import React, { PropTypes } from 'react';

export default class Main extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		
		const username = this._username.value;
		const password = this._password.value;
		console.log(username);
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
				<div className="login-top">
					<div className="cs-card-Top">
						<center><img src="Boy_Happy.png" width="100" /></center>
						<div className="LogoTrashBoy">
							<center><img src="TrashPay.png" width="100" /></center>
						</div>
					</div>
				</div>
				<br></br>
				{/* <hr /> */}
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className=" form-group">
						<br></br>
						<input type="text" placeholder="&#xf007;   usuário" className="form-control fmctFA"
							ref={(node) => this._username = node} />
					</div>
					<div className="form-group">
						<input type="password" className="form-control fmctFA"
							placeholder="&#xf084;   senha" ref={(node) => this._password = node} />
						<p />
						<a href="recover_password" >Esqueceu a conta?</a>
					</div>
					<div className="row">
						<div className="col-md-12">
							<button 
								type="submit" 
								className="loginbt btn btn-default btn-block">
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
				<div className="row col-md-12 ">
					<a href="/admin/caduser/">
						<button 
								type="submit"
								onClick='' 
								className="cadbt btn btn-default btn-block">
							Cadastrar
						</button>
					</a>
				</div>
				<br></br>
				<hr></hr>
				<div className="row" style={{marginTop: '-10px'}}>
					<div className="col-md-12">
						<a href="#">
							<center><img src="Facebook.png" width="200" /></center>
						</a>
					</div>
				</div>

				<br></br>
				<br></br>
			</div>
		);
	}
}

Main.propTypes = {
	actions: PropTypes.object.isRequired,
	login: PropTypes.object.isRequired
};