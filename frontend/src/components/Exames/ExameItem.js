import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

export default class ExameItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			x: 0, y: 0, 
			isFilesOpen: false, 
			isMapOpen: false, 
			isDetailsOpen: false, 
			locations: {}, 
			files: [],
			details: {} 
		};
	}

	getStyle(width = 400, height = 400) {
		const top = window.innerHeight < this.state.y + height ? (this.state.y - height) : this.state.y;
		const left = window.innerWidth < this.state.x + width ? (this.state.x - width) : this.state.x;
		return {
			overlay: { backgroundColor: 'rgba(255, 255, 255, 0.75)' },
			content: { 
				left: `${left}px`,
				top: `${top}px`, 
				height: `${height}px`,
				width: `${width}px`,
				overflowY: "auto", 
				overflowX: "hidden"
			}
		};
	}

	render () {
		const { id, title, isSelecting } = this.props;
		console.log(id);		
		return (			
			<div className="document-container">
				<div className={`document-card cs-card`}>					
					<div className="document-left">
						<div className="rounded-div">
							<span 
								className="group-name"
								data-place="left">
							</span>
							<ReactTooltip />
						</div>
					</div>
					<div className="document-center">
						<div className="document-title" title={title}>
							{title}
						</div>
					</div>
					<div className="document-right">
						<div className="document-actions">
							<span>
								<i 
									className="fa fa-eye pointer hoverable" 
									data-tip="Detalhes" 
									onClick={this.handleDetailsClick.bind(this)}
								/>								
								&nbsp;&nbsp;
								<i 
									className="far fa-map pointer hoverable" 
									data-tip="Localização" 
								/>
								&nbsp;&nbsp;									
								<i 
									className="far fa-copy pointer hoverable" 
									data-tip="Arquivos" 
								/>																															
								&nbsp;&nbsp;
								<i 
									className="fa fa-edit pointer hoverable" 
									data-tip="Editar Informações" 
								/>
							</span>							
							<ReactTooltip />
						</div>
						<div className="document-loading">
							{isSelecting === this.props.id 
								? <i className="fas fa-circle-notch fa-spin fa-fw" /> : null}
						</div>						
					</div>
				</div>
			</div>			
		);
	}
}

ExameItem.propTypes = {
	viewDocument: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	isSelecting: PropTypes.number
};