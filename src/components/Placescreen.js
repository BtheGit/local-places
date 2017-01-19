import React, { Component } from  'react';
import { hidePlacescreen } from '../actions/actions';

class Place extends Component {
	constructor(props) {
		super(props);
	}

	renderPlace(place) {
		return(
			<div>
				<h1>{place.title || ''}</h1>
				<div>
					{place.imagesArray.length > 0 ? <img src={place.imagesArray[0]} className="placescreen-img"/> : null}
				</div>
				<a href={place.website} target="_blank">{place.website}</a>
				<p>{place.address || ''}</p>
				<br/>
				<h3>{place.summary || ''}</h3>
				<p>Rating: {place.rating || 'N/A'}</p>
				<br/>
				<div className="placescreen-desc">{place.description || ''}</div>
			</div>
		)
	}


	render() {
		return (
			<div className="placescreen">
				<a id="placescreen-btn-close" onClick={(e) => this.props.dispatch(hidePlacescreen())}>✕</a>
				{this.renderPlace(this.props.place[0])}
			</div>
		)
	}
}

export default Place;
