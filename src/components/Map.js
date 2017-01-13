import React, { Component } from 'react';
import { populateMarkers, highlightPlace, unhighlightPlace, asyncHighlightPlace, asyncUnhighlightPlace } from '../actions/actions'
import { connect } from 'react-redux';

class Map extends Component {
	constructor(props){
		super(props)

		this.state = {
			defaultMarker: this.makeMarkerIcon('55BB00'),
        	highlightedMarker: this.makeMarkerIcon('FFFF24'),

		}
	}

	buildMarkers(places) {
		let self = this;
		const markersArray = [];
		for (let i = 0; i < places.length; i++) {

	        const marker = new google.maps.Marker({
				position: places[i].position,
				title: places[i].title,
				address: places[i].address || '',
				rating: places[i].rating || 'none',
				description: places[i].description || '',
				map: this.map,
				icon: this.state.defaultMarker,
				animation: google.maps.Animation.DROP,
				id: places[i].id
	        });

	        markersArray.push(marker);
     
	        marker.addListener('click', function() {
	          self.populateInfoWindow(this, self.largeInfowindow);
	        });

	        marker.addListener('mouseover', () => {
	        	marker.setIcon(this.state.highlightedMarker);
	        	this.props.dispatch(asyncHighlightPlace(marker.id));
	        });

	        marker.addListener('mouseout', () => {
	        	//to avoid overwriting the highlighted bouncing effect too soon
	        	if(marker.animation === null){
	 	        	marker.setIcon(this.state.defaultMarker);
	 	        	this.props.dispatch(asyncUnhighlightPlace());       		
	        	}
	        });        	
        }
        this.props.dispatch(populateMarkers(markersArray));
	}

    populateInfoWindow(marker, infowindow) {
    	console.log(marker);
    	if (infowindow.marker != marker) {
    		infowindow.setContent('');
    		infowindow.marker = marker;
    		this.toggleBounce(marker);
    		marker.setIcon(this.state.highlightedMarker)
    		infowindow.addListener('closeclick', () => {
    			marker.setAnimation(null);
    			marker.setIcon(this.state.defaultMarker)
    			infowindow.marker = null;
    		});

    	const newContent = '<div class="iwContainer">' +
    							 '<div class="iwTitle">' + marker.title + '</div>' +
    							 '<br>' +
    							 '<div class="iwRating">Rating: ' + marker.rating + '</div>' +
    							 '<div class="iwDescription">' + marker.description + '</div>' +
    							 '<br>' +
    							 '<div class="iwAddress"Address: >' + marker.address + '</div>' +
    						'</div>';
    	infowindow.setContent(newContent);
        infowindow.open(map, marker);

    	}
    }


	toggleBounce(marker) {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}

	makeMarkerIcon(markerColor) {
      	const newMarker =  new google.maps.MarkerImage(
      		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +'|40|_|%E2%80%A2',
      		new google.maps.Size(21,34),
      		new google.maps.Point(0,0),
      		new google.maps.Point(10, 34),
      		new google.maps.Size(21,34)
      		);
      	return newMarker
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
		//build generic infowindow
		this.largeInfowindow = new google.maps.InfoWindow();

		//build and populate map
        this.map = new google.maps.Map(this.refs.map, {
          center: this.props.maps.startLocation,
          zoom: this.props.maps.zoomLevel,
          mapTypeControl: false,
          styles: this.props.maps.styles
        });

        //build markers and associate them with custom infowindows and color schemes, populate an array of them
        //later calls to the database will take the place of static placesArray (prior to the that, need to use static API JSON file)
        this.buildMarkers(this.props.maps.placesArray)


	}

	componentDidReceiveProps() {
		//this is where we can update the component when store state changes
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
