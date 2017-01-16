import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Places from './components/Places';
import Map from './components/Map';
import { connect } from 'react-redux';
import { selectMarker, focusInfoWindow } from './actions/actions'




class App extends Component {
	constructor(props) {
		super(props)
		this.state ={
		}
		this.selectMenuItem = this.selectMenuItem.bind(this);
	}


	selectMapMarker(place) {
		//locate corresponding marker when place is selected to highlight it
		const selectedMarker = this.props.maps.markersArray.filter((marker, index) => {
			if (marker.id === place.id) {
				return marker;
			}
		});
		//selectedMarker filter returns an array, we only want the first result
		// console.log(selectedMarker[0])
		this.props.dispatch(selectMarker(selectedMarker[0].id));
		this.props.dispatch(focusInfoWindow(selectedMarker[0]));
	}

	selectMenuItem(place) {
		//place is an object representing a PLACE database entry

		//logic for selecting one listItem at a time by adding CSS class. get all previous items with class instance
		//and clear them out and then add new one. Is there a smarter way to do this? This will need to be replaced when 
		//clicking the item causes an expansion rather than just a visual change.

		this.highlightSelectedPlace(place.id);
		this.selectMapMarker(place);

	}

	highlightSelectedPlace = placeId => {
		const selectedElems = document.getElementsByClassName('places-place-selected');
		if(selectedElems.length > 0){
			for (let i =0; i < selectedElems.length; i++) {
				selectedElems[i].classList.remove('places-place-selected');
			}
		}
		const placeElem = document.getElementById('place' + placeId);
		placeElem.classList.add('places-place-selected');

	}



	render(){

		return (
			<div>
				<div style={{width: window.innerWidth * .5, height: window.innerHeight * .98, float: 'left'}}>
					<Map 
						highlightSelectedPlace={this.highlightSelectedPlace}
					/>		
				</div>
				<div style={{width: window.innerWidth * .45, height: '100%', float: 'right', top: 0, right: 0}}>
					<Places
						selectMenuItem={this.selectMenuItem}
					/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  };
}

export default connect(mapStateToProps)(App);


