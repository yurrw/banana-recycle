import React from 'react';

export const getButtonUI = (status, message, progress) => {
	switch ( status ) {			
		case "IN_PROGRESS":
			return (				
				<div className="progress">
					<div 
						className="progress-bar progress-bar-success progress-bar-striped active" 
						style={{width: `${progress}%`}}
					>
						{`${progress}%`}
					</div>
				</div>				
			);
		case "SUCCESS":
			return (
				<span style={{color: "green"}}>{message}</span>
			);
		case "ERROR":
			return (
				<span style={{color: "red"}}>{message}</span>
			);
		case "IDLE":				
		default:
			return null;
	}	
};