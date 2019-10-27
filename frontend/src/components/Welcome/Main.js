import React from 'react';
import { Link } from 'react-router';

export default class Main extends React.Component {

	componentWillMount() {
	}

	render() {
		return (
			<div className="container Welcome-box cs-card">
				<div className="Welcome-title">
						Histórico de consumo
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-6 allsideindex " >
							<div className="linereta">
							</div>
							<div className="circletop">
								<div className="boxInfo">
									<span>
										o tamanho da bolinha correlaciona a variação de itens reciclados em dado periodo de tempo.
									</span>
								</div>
								<div className="circle1">
									<div className='datetxt1'>
									26/OUT/19
									</div>
								</div>
								<div className="boxInfo2">
									<span>
										3 carrinhos de recompensa.
										<br></br>
										Você economizou cerca de 1kg de carbono durante esse período.
									</span>
								</div>
								<div className="circle2">
									<div className='datetxt2'>
									04/JUL/19
									</div>
								</div>
							</div>
						</div>
						<div className=" center col-md-6 allleftindex">
							<center><img src="Boy_Question.png" width="200" /></center>
						</div>
					</div>
					
				</div>
				
				<div>
				</div>
			</div>
		);
	}
}