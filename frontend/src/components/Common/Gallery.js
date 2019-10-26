import React, { PropTypes } from 'react';

export default class Gallery extends React.Component {

	constructor(props) {
		super(props);
		this.state = { selected: 0 };
	}

	render () {	
		const { images } = this.props;
		return (						
			<div className="gallery-container">
				<div className="main-image">
					<img 
						src={images[this.state.selected].src}
						width="480px"
						height="360px" 
					/>
					<div className="image-caption">{images[this.state.selected].caption}</div>
				</div>
				<div className="thumb-container">
					{images.map((image, i) => 
						<div key={i} className="thumb-item">
							<img 
								src={image.src}
								width="160px"
								height="120px"
								title="Clique para selecionar"
								onClick={() => this.setState({selected: i})}
							/>
						</div>
					)}					
				</div>
			</div>				
		);
	}
}

Gallery.propTypes = {
	images: PropTypes.array.isRequired
};