import React, { PropTypes } from 'react';
import Modal from 'react-modal';

export default class LightBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = { width: window.innerWidth, height: window.innerHeight };
	}

	render () {
		const defaultStyle = {
			overlay: {
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(255, 255, 255, 0.75)'
			},
			content: {
				position: 'absolute',
				top: (this.state.height - 420) / 2 + "px",
				left: (this.state.width - 720) / 2 + "px",
				right: (this.state.width - 720) / 2 + "px",
				bottom: (this.state.height - 420) / 2 + "px",
				width: "720px",
				height: "420px",
				border: '1px solid #ccc',
				background: '#fff',
				overflow: 'auto',
				WebkitOverflowScrolling: 'touch',
				borderRadius: '4px',
				outline: 'none',
				padding: '20px',
				paddingBottom: "10px"
			}
		};
		const { isOpen, onClose, style, children } = this.props;		
		return (			
			<Modal 
				isOpen={isOpen} 
				onRequestClose={onClose}
				style={style || defaultStyle}>
				{children}
			</Modal>				
		);
	}
}

LightBox.propTypes = {
	children: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	style: PropTypes.object
};