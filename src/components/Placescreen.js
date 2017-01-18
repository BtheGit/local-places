import React, { Component } from  'react';
import { hidePlacescreen } from '../actions/actions';

class Place extends Component {
	constructor(props) {
		super(props);
	}

	renderPlace(place) {
		return(
			<div>
				<h1>{place.title}</h1>
				<p>Rating: {place.rating}</p>
				<br/>
				<h3>{place.summary}</h3>
				<br/>
				<span>{place.description || ''}</span>
			</div>
		)
	}


	render() {
		return (
			<div className="placescreen">
				{this.renderPlace(this.props.place[0])}
				<a className="btn btn-primary" onClick={(e) => this.props.dispatch(hidePlacescreen())}>Close</a>
			</div>
		)
	}
}

export default Place;
