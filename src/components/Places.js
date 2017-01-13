import React, { Component } from 'react';
import {asyncPopulatePlacesList} from '../actions/actions';
import {connect} from 'react-redux';

class Places extends Component {
	constructor(props){
		super(props)

	}

	showPlaces(placesArray) {
		const placesList = [];
		for (let i = 0; i < placesArray.length; i++) {
			// placesList.push(<li key={i} onClick={()=> this.highlightPlace(placesArray[i])}>{placesArray[i].title}</li>)
			placesList.push(<li key={i} className='places-place' id={'place' + i} onClick={()=> this.props.selectMenuItem(placesArray[i])}>{placesArray[i].title}</li>)
		}
		return placesList;
	}

	//############### eventlisteners functions #################

	addPlaceListeners(placesArray) {
		let self = this;
		for (let i =0; i < placesArray.length; i++) {
			const id = 'place' + i;
			document.getElementById(id).addEventListener('mouseover', function() {
				self.highlightPlace(i)
			})
		}
	}

	removePlaceListeners(placesArray) {
		for (let i =0; i < placesArray.length; i++) {
			const id = 'place' + i;
			document.getElementById(id).removeEventListener('mouseover', function() {
				self.highlightPlace(i)
			})
		}

	}

	highlightPlace(key) {
		console.log(key);
	} 

	//############### END eventlisteners functions #################

	componentDidMount() {
		let placesBuild = new Promise( (resolve, reject) => {
					resolve(this.props.dispatch(asyncPopulatePlacesList(this.showPlaces(this.props.maps.placesArray))))
			})
		//still trying to figure out best way to add eventlisteners after places are populated, promise or thunk or both
	}

	componentDidReceiveProps() {
		this.addPlaceListeners(this.props.placesArray)

	}

	componentWillUnmount() {
		this.removePlaceListeners(this.props.placesArray)
	}

	render() {
		return (
			<div>
				<div style={{textAlign: 'center'}}><ul>{this.props.maps.placesList}</ul></div>
			</div>
			
		)
	}
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  };
}

export default connect(mapStateToProps)(Places);
