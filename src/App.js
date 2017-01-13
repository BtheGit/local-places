import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Places from './components/Places';
import Map from './components/Map';
import { connect } from 'react-redux';
import { selectMarker } from './actions/actions'




class App extends Component {
	constructor(props) {
		super(props)
		this.state ={}
		this.selectMenuItem = this.selectMenuItem.bind(this)
	}


	selectMapMarker() {

	}

	selectMenuItem(place) {
		//locate corresponding marker when place is selected to highlight it
		const selectedMarker = this.props.maps.markersArray.filter((marker, index) => {
			if (marker.id === place.id) {
				return marker;
			}
		})
		this.props.dispatch(selectMarker(selectedMarker[0].id))

	}



	render(){

		return (
			<div>
				<div style={{width: window.innerWidth * .5, height: window.innerHeight * .98, float: 'left'}}>
					<Map />		
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


