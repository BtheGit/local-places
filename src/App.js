import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Places from './components/Places';
import Map from './components/Map';
import { connect } from 'react-redux';



class App extends Component {
	constructor(props) {
		super(props)
		this.state ={}
		this.selectMenuItem = this.selectMenuItem.bind(this)
	}


	selectMapMarker() {

	}

	selectMenuItem(marker) {
		console.log(marker)
	}

	render(){

		return (
			<div>
				<div style={{width: window.innerWidth * .5, height: window.innerHeight * .98, float: 'left'}}>
					<Map 
						center={this.props.maps.startLocation}
						markers={this.props.maps.markers}
						zoom={this.props.maps.zoomLevel}
						styles={this.props.maps.styles}
					/>		
				</div>
				<div style={{width: window.innerWidth * .3, height: '100%', float: 'right', top: 0, right: 0}}>
					<Places
						placesArray={this.props.maps.markers}
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


