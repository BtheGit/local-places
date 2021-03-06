import React, { Component } from 'react';
import { viewPlacescreen } from '../actions/actions';

class SidebarPlace extends Component {
	constructor(props) {
		super(props)
	}


	render() {

		return (
			<div
				key={this.props.iterKey}
				className='sidebar-place'
				id={this.props.placeId}
				onClick={()=> this.props.highlightSelectedPlace(this.props.place.id)}
			>
				<p>{this.props.place.summary}</p>
				<a className="btn btn-primary" onClick={(e) => this.props.dispatch(viewPlacescreen(this.props.place.id))}>+ Detail</a>
			</div>
		)
	}
}

export default SidebarPlace;
