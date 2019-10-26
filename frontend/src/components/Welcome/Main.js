import React from 'react';
import { Link } from 'react-router';

export default class Main extends React.Component {

	componentWillMount() {
	}

	render() {
		return (
			<div className="container Welcome-box cs-card">
				<div className="Welcome-title">
						Liberacao de Exames 
				</div>
				<hr />
				<div>
					<Link to="/admin/documents/create" className="item-icon1 item-iconMargin">
						<img src="/create_icon.png" className="center" />
					</Link>

					<Link to="/admin/documents/view" className="item-icon2 item-iconMargin">
						<img src="/documents_icon.png" className="center" />
					</Link>
				</div>

				<div>
				</div>
			</div>
		);
	}
}