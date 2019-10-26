import React, { Component, PropTypes } from 'react'
import QrReader from 'react-qr-reader'

export default class Main extends React.Component {
	state = {
		result: 'No result'
	}
 
	handleScan = data => {
		if (data) {
			this.setState({
				result: data
			})
		}
	}
	handleError = err => {
		console.error(err)
	}
	render() {
		return (
			<div>
				<QrReader
					delay={300}
					onError={this.handleError}
					onScan={this.handleScan}
					style={{ width: '100%' }}
				/>
				<p>{this.state.result}</p>
			</div>
		)
	}
}
 