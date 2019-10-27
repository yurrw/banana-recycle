import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import '../../styles/core.scss';

export default class Navbar extends React.Component {
	greeting() {
		const hour = parseInt(moment().format("H"));
		if ( hour <= 12 && hour >= 6 ) return "Bom dia";
		else if ( hour <= 18 && hour >= 13 ) return "Boa tarde";
		else return "Boa noite";
	}
	render () {
		return (
			<nav className="navbar navbar-default navbarscss">
				<div className="container-fluid">
					<div className="navbar-header">

						{/* Toggle Button */}
						<button 
							type="button" 
							className="navbar-toggle collapsed" 
							data-toggle="collapse" data-target="#cs-navbar-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>

						{/* Icon Brand */}
						<a className="navbar-brand" style={{height: "50px", paddingTop: "0px", 
							paddingLeft: "30px", paddingBottom: "9px"}}
							href="/">
							<img alt="TrashCoin Logo" src="/TrashCointmpLogo.png" height="50px" />
						</a>
						
					</div>
					<div className="collapse navbar-collapse" id="cs-navbar-collapse">

						<p className="navbar-text navbarTrashPay" >
							<img src="TrashPayBlack.png" width="35"></img>
						</p>

						<ul className="nav navbar-nav" id="nav-bananas">
							<li className={this.props.pathname === "/admin/documents/create" ? 'active' : ''}>
								<Link to="/admin/welcome">Home</Link>
							</li>

							<li className={this.props.pathname === "/admin/documents/create" ? 'active' : ''}>
								<Link to="/admin/qrcode">Troca Aqui</Link>
							</li>
							<li className={this.props.pathname === "/admin/documents/create" ? 'active' : ''}>
								<Link to="/admin/qrcode/duo">Troca pra mim</Link>
							</li>
							<li className={this.props.pathname === "/admin/documents/view" ? 'active' : ''}>
								<Link to="/admin/authexams/view">Configurações</Link>
							</li>	
							<li><Link to="/admin/change_password">Alterar Senha</Link></li>
							<li onClick={() => this.props.logout()} ><a href="#">Sair</a></li>						
						</ul>
					</div>
				</div>
			</nav>				
		);
	}
}

Navbar.propTypes = {
	username: PropTypes.string,
	pathname: PropTypes.string,
	projectaccess: PropTypes.array.isRequired,
	choosenbyuser: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	setChoosenByUser: PropTypes.func.isRequired
};