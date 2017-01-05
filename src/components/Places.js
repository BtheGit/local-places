import React, { Component } from 'react';

export default class Places extends Component {
	constructor(props){
		super(props)
	}

	showPlaces(array) {
		const placesList = [];
		for (let i = 0; i < array.length; i++) {
			// placesList.push(<li key={i} onClick={()=> this.highlightPlace(array[i])}>{array[i].title}</li>)
			placesList.push(<li key={i} onClick={()=> this.props.selectMenuItem(array[i])}>{array[i].title}</li>)
		}
		return placesList;
	}

	highlightPlace(key) {
		console.log(key);
	} 

	render() {
		return (
			<div>
				<div style={{textAlign: 'center'}}><ul>{this.showPlaces(this.props.placesArray)}</ul></div>
			</div>
			
		)
	}
}

