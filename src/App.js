import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Places from './components/Places';
import Map from './components/Map';
import { connect } from 'react-redux';
import { 
	selectMarker, 
	focusInfoWindow,
	populateMarkers, 
	highlightPlace, 
	unhighlightPlace, 
	asyncHighlightPlace, 
	asyncUnhighlightPlace, 
	asyncAddMarkerIcon, 
	loadInfoWindow  
} from './actions/actions'




class App extends Component {
	constructor(props) {
		super(props)
		this.state ={
		}
		this.selectMenuItem = this.selectMenuItem.bind(this);
	}

	componentDidMount() {
		//build generic infowindow
		this.largeInfowindow = new google.maps.InfoWindow();
		this.props.dispatch(loadInfoWindow(new google.maps.InfoWindow())) //unused 
        //build action/reducer for pushing markerIcons to store object
       	this.props.dispatch(asyncAddMarkerIcon('default', this.makeMarkerIcon('55BB00')));
       	this.props.dispatch(asyncAddMarkerIcon('highlighted', this.makeMarkerIcon('FFFF24')));

        //build markers and associate them with custom infowindows and color schemes, populate an array of them
        //later calls to the database will take the place of static placesArray (prior to the that, need to use static API JSON file)
        this.buildMarkers(this.props.maps.placesArray)				
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

	//## FROM Map

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
				// map: this.map,
				icon: this.props.maps.markerIcons.default || this.makeMarkerIcon('55BB00'), //this tends to start too early, need to patch async
				animation: google.maps.Animation.DROP,
				id: places[i].id
	        });

     
	        marker.addListener('click', function() {
	          self.populateInfoWindow(marker, self.largeInfowindow);
	          self.highlightSelectedPlace(marker.id)
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

	render(){

		return (
			<div>
				<div style={{width: window.innerWidth * .5, height: window.innerHeight * .98, float: 'left'}}>
					<Map 
						markers={this.props.maps.markersArray}
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


