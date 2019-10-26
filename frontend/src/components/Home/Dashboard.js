import React from 'react';

export default class Dashboard extends React.Component {

	render () {
		return (
			<div className="row" style={{textAlign: "center"}}>
				<div className="col-md-8 col-md-offset-2">
					<div className="panel panel-default">
						<div className="panel-body" style={{height: "600px"}}>
							<div>
								<h2>Informações Gerais</h2>
								<hr />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}