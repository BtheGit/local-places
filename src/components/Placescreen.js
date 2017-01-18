import React, { Component } from  'react';
import { hidePlacescreen } from '../actions/actions';

class Place extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="placescreen">
				<h1>Place Screen</h1> 
				<p>{this.props.placeId}</p>
				<a className="btn btn-primary" onClick={(e) => this.props.dispatch(hidePlacescreen())}>Close</a>
			</div>
		)
	}
}

export default Place;
