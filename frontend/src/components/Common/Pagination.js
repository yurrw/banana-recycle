import React, { PropTypes } from 'react';

export default class Pagination extends React.Component {

	isActive(page) {
		return this.props.pagination.currentPage === page 
			? { backgroundColor: "firebrick", color: "white" } 
			: { color: "black" };
	}

	getVisible(array, currentPage) {
		return array.filter((e, i) => {
			return e === 0 || e === array.length - 1 || e === currentPage - 1 || e === currentPage - 2 || e === currentPage;
		});
	}

	getLines() {
		let array = [];
		for ( let i = 0; i < this.props.totalPages; i++ ) array[i] = i;
		const visible = this.getVisible(array, this.props.pagination.currentPage);
		return visible.map((n, i) => {
			return [
				this.getDotsBefore(visible, i),
				<li key={i}>
					<span className="pointer" style={this.isActive(n+1)} onClick={() => this.props.setPage(n+1)}>{n+1}</span>
				</li>,
				this.getDotsAfter(visible, i)
			];
		});
	}

	getDotsBefore(visible, i) {
		return i === 1 && visible[1] - visible[0] !== 1 ? <li key={10000 - i}><span>...</span></li> : null;
	}

	getDotsAfter(visible, i) {
		return i === visible.length - 2 && visible[visible.length - 1] - visible[visible.length - 2] !== 1 
			? <li key={10001 + i}><span>...</span></li> 
			: null;
	}

	getPrevious() {
		const { setPage, pagination } = this.props;
		const isFirstPage = pagination.currentPage === 1;
		return (
			<li>
				<span 
					style={{color: "black", cursor: isFirstPage ? "not-allowed" : "pointer"}} 
					onClick={() => {
						if ( !isFirstPage ) setPage(pagination.currentPage - 1);
					}}>
					<i className="fa fa-arrow-left" />
				</span>
			</li>
		);
	}

	getNext() {
		const { setPage, pagination, totalPages } = this.props;
		const isLastPage = totalPages === pagination.currentPage;
		return (
			<li>
				<span 
					style={{color: "black", cursor: isLastPage ? "not-allowed" : "pointer"}} 
					onClick={() => {
						if ( !isLastPage ) setPage(pagination.currentPage + 1);
					}}
				>
					<i className="fa fa-arrow-right" />
				</span>
			</li>
		);
	}

	render () {
		const buttonStyle = {
			color: "black", 
			marginLeft: "10px", 
			fontWeight: "bold",
			borderTopRightRadius: "0px",
			borderBottomRightRadius: "0px"
		};
		return (			
			<div className="select-group">
				<div style={{width: "700px", display: "flex", justifyContent: "flex-end"}}>						
					<nav>						
						<ul className="pagination">
							{this.getPrevious()}					
							{this.getLines()}
							{this.getNext()}
							<li>
								<span style={buttonStyle}>
									{this.props.totalDocuments} Ofertas
								</span>
							</li>
						</ul>
					</nav>
				</div>
			</div>				
		);
	}
}

Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	totalPages: PropTypes.number.isRequired,
	totalDocuments: PropTypes.number.isRequired,
	pagination: PropTypes.object.isRequired
};