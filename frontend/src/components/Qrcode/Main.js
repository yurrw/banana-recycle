import React, { Component, PropTypes } from 'react'

export default class Main extends React.Component {

	constructor(props) {
		super(props);
		this.state = { showing: false };
	}

	randomNumber(min, max) {  
		return Math.round(Math.random() * (max - min) + min);
	}  

	qrCodeGenerator() {
		let arr= ['qr1.png', 'qr2.png'];
		let pos = this.randomNumber(0, 1);
		console.log(arr[pos]);
		return (arr[pos]).toString();
	}
	render() {
		const { showing } = this.state;
		return (
			<div className="container Welcome-box cs-card">
				<div className="Welcome-title">
					<span className="titlePageGGD">Apresente seu QRCODE para troca </span>
					<hr></hr>
				</div>
				<div className="row">
					<div className="col-md-4 center">
						<div id="QRCODEDAFE" >
							{showing 
							?<center><img id="QRCODEDAFE" src={this.qrCodeGenerator() } width="250" /></center>
							:null}
						</div>
						<hr></hr>
					</div>
					<div className="col-md-5 ">
						<span className="miniTextoExp">
							Aperte no botão abaixo para gerar o seu QRCode.
							Ele contém as informações dos seus itens que
							serão reciclados.
							Gere o seu QRCode e o leve até o local de coleta mais próximo para ganhar pontos.
						</span>
						<br></br>
					</div>
					<br></br>
					<button className="bntqrcode btn btn-default loginbt btn-block"
					 onClick={() => this.setState({ showing: true })}>
						QRCODE!
					</button>
					
				</div>
				<br></br>
				<br></br>
				<br></br>
			</div>
		);
	}
}
 