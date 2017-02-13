import React, { Component } from 'react';
import { connect } from 'react-redux';

class Map extends Component {
	constructor(props){
		super(props)

	}


 	connectMarkers(placesArray, map) {
 		return placesArray.map(function(place) {
 			return place.marker.setMap(map)
 		})
 	}

	//+++++++++++++++++REACT LIFECYCLE FUNCTIONS++++++++++++++++++++++++

	shouldComponentUpdate() {
		//do not let the map continue to rebuild on every update to Map component. instead updates will be handled by 
		//componentDidReceiveProps instead
		//question: does this mean I should not bind props to state here and instead only pass props to Map from App,
		//by binding am I negating the benefits of minimal component updates?
		return false;
	}

	componentDidMount() {

        const map = new google.maps.Map(this.refs.map, {
          center: this.props.maps.startLocation,
          zoom: this.props.maps.zoomLevel,
          mapTypeControl: false,
          styles: this.props.maps.styles[this.props.maps.currentMapStyle]
        });

        setTimeout(() => {this.connectMarkers(this.props.places, map)}, 100) //SHITTY - figure out a less hacky way!!

	}

	componentWillReceiveProps() {


	}

	render() {
		return (
			<div id="map" ref="map" style={{height: '100%'}}></div>
		)
	}
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  };
}

export default connect(mapStateToProps)(Map);
