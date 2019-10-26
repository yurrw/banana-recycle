import React, { PropTypes } from 'react';

const AnimatableSpan = (props) => {
	return (
		<span className={`help-block ${props.animate ? "help-block-transition": ""}`}>
			{props.text}
		</span>
	);
};

export default AnimatableSpan;

AnimatableSpan.propTypes = {
	animate: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
};