import React, { PropTypes } from 'react';
import { getButtonUI } from '../../businessLogic/components';
import ReactTooltip from 'react-tooltip';
export default class ActionBar extends React.Component {

	getDeleteButton() {
		return this.props.showDelete 
			? (
			<div className="col-md-1">			
				<button 
					type="button" 
					className="btn btn-danger btn-block"
					disabled={this.props.upload.status === "IN_PROGRESS"}
					onClick={() => this.props.onDelete()}						
				>
					<i className="fa fa-trash fa-2x" data-tip="Deletar Documento" />
				</button>
				<ReactTooltip />
			</div>
			) : null;
	}

	render () {				
		const { onSave, pessoa, upload, selected } = this.props;		
		const { ...finalDoc } = pessoa;

		return (
			
			<div className="row">
				
				<div className="col-md-3">			
					<button 
						type="button" 
						className="btn btn-primary btn-lg btn-block"
						disabled={(upload.status === "IN_PROGRESS" ) || !(this.props.salvarEnabled)}
						onClick={() => {
							if ( document.title === "" ) {
								alert("Título é obrigatório!");
								return;
							}
							if ( document.groups.length === 0 && document.hasOwner === 1 ) {
								alert("Selecione pelo menos um grupo");
								return;
							}
							onSave(finalDoc, selected);
						}}>
						Salvar
					</button>
				</div>
				<div className="col-md-8">
					<div style={{padding: "9px"}}>{getButtonUI(upload.status, upload.message, upload.progress)}</div>
				</div>
				{this.getDeleteButton()}		
			</div>
		);
	}
}

ActionBar.propTypes = {
	upload: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	selected: PropTypes.number,
	pessoa: PropTypes.object.isRequired
};