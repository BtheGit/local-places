import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Places from './components/Places';
import Map from './components/Map';


class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			startLocation: {lat: 22.624695, lng: 120.307813},
			zoomLevel: 13,
			markers: [
				{title: 'TianA Vietnamese Restaurant', position: {lat: 22.6301162, lng: 120.31294260000004}},
				{title: "Brendan's House", position: {lat: 22.624695, lng: 120.307813}},
				{title: 'Nanhe Spa', position: {lat: 22.62994914039921, lng: 120.31899869441986}},
				{title: "Tobey's Games Cafe", position: {lat: 22.646440050553554, lng: 120.30407756567001}, address: "No. 247, Songjiang St, Sanmin District, Kaohsiung City, Taiwan 807"}
			],
			styles: [
				// {"elementType":"labels","stylers":[{"visibility":"off"}]},
				// {"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#0F0919"}]},
				// {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#E4F7F7"}]},
				// {"elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
				// {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#002FA7"}]},
				// {"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#E60003"}]},
				// {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#FBFCF4"}]},
				// {"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#FFED00"}]},
				// {"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#D41C1D"}]},
				// {"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#BF0000"}]},
				// {"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"saturation":-100}]}
			]

		}

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
						center={this.state.startLocation}
						markers={this.state.markers}
						zoom={this.state.zoomLevel}
						styles={this.state.styles}
					/>		
				</div>
				<div style={{width: window.innerWidth * .3, height: '100%', float: 'right', top: 0, right: 0}}>
					<Places
						placesArray={this.state.markers}
						selectMenuItem={this.selectMenuItem}
					/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));