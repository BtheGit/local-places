import React, { Component } from 'react';
import { 
	populateMarkers, 
	highlightPlace, 
	unhighlightPlace, 
	asyncHighlightPlace, 
	asyncUnhighlightPlace, 
	asyncAddMarkerIcon, 
	loadInfoWindow 
} from '../actions/actions'
import { connect } from 'react-redux';

class Map extends Component {
	constructor(props){
		super(props)

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
				icon: this.props.maps.markerIcons.default || this.makeMarkerIcon('55BB00'), //this tends to start too early, need to patch async
				animation: google.maps.Animation.DROP,
				id: places[i].id
	        });

     
	        marker.addListener('click', function() {
	          self.populateInfoWindow(marker, self.largeInfowindow);
	          self.props.highlightSelectedPlace(marker.id)
	          // self.populateInfoWindow(marker, this.props.maps.infoWindow);

	          	// document.getElementById('place' + marker.id).classList.toggle('places-place-selected'); 
	          	// needs to be implemented correctly
	        });

	        marker.addListener('mouseover', () => {
	        	document.getElementById('place' + marker.id).classList.add('places-place-manualHover'); //hover PlacesList elem
	        	marker.setIcon(this.props.maps.markerIcons.highlighted);
	        	this.props.dispatch(asyncHighlightPlace(marker.id));
	        });

	        marker.addListener('mouseout', () => {
	        	//to avoid overwriting the highlighted bouncing effect too soon
	        	if(marker.animation === null){
	        		document.getElementById('place' + marker.id).classList.remove('places-place-manualHover'); 
	 	        	marker.setIcon(this.props.maps.markerIcons.default);
	 	        	this.props.dispatch(asyncUnhighlightPlace());       		
	        	}
	        });     

   	        markersArray.push(marker);
   	
        }
        this.props.dispatch(populateMarkers(markersArray));
	}

    populateInfoWindow(marker, infowindow) {
    	console.log(marker);
    	if (infowindow.marker != marker) {
    		infowindow.setContent('');
    		infowindow.marker = marker;
    		this.toggleBounce(marker);
    		marker.setIcon(this.props.maps.markerIcons.highlighted)
    		infowindow.addListener('closeclick', () => {
    			marker.setAnimation(null);
    			marker.setIcon(this.props.maps.markerIcons.default)
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
        console.log(infowindow);

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
		this.props.dispatch(loadInfoWindow(new google.maps.InfoWindow()))

		//build and populate map
        this.map = new google.maps.Map(this.refs.map, {
          center: this.props.maps.startLocation,
          zoom: this.props.maps.zoomLevel,
          mapTypeControl: false,
          styles: this.props.maps.styles
        });
        //build action/reducer for pushing markerIcons to store object
       	this.props.dispatch(asyncAddMarkerIcon('default', this.makeMarkerIcon('55BB00')));
       	this.props.dispatch(asyncAddMarkerIcon('highlighted', this.makeMarkerIcon('FFFF24')));

        //build markers and associate them with custom infowindows and color schemes, populate an array of them
        //later calls to the database will take the place of static placesArray (prior to the that, need to use static API JSON file)
        this.buildMarkers(this.props.maps.placesArray)


	}

	componentWillReceiveProps() {
		// console.log(this.props.maps.activeInfoWindow)
		// console.log(this.props)
		// console.log(this.props.maps.markersArray[0])
		// this.populateInfoWindow(this.props.maps.activeInfoWindow || this.props.maps.markersArray[0], self.largeInfowindow)
		//this is where we can update the component when store state changes
		//need to detect when List item is selected and infowindow is called
		// if(this.props.maps.activeInfoWindow !== undefined && this.props.maps.activeInfoWindow !== {}) {
		// 	console.log('focusing')
		// 	this.populateInfoWindow(this.props.maps.activeInfoWindow, self.largeInfowindow)
		// }
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
