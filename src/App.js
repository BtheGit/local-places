import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar';
import Mapscreen from './components/Map';
import Placescreen from './components/Placescreen';
import { connect } from 'react-redux';
import {
	asyncPopulatePlacesFromDB,
	selectMarker,
	focusInfoWindow,
	populateMarkers,
	highlightPlace,
	unhighlightPlace,
	asyncHighlightPlace,
	asyncUnhighlightPlace,
	addMarkerIcon,
	loadInfoWindow,
	viewPlacescreen
} from './actions/actions';
import icons from './media/inlineIcons';



class App extends Component {
	constructor(props) {
		super(props)
		this.selectMenuItem = this.selectMenuItem.bind(this);
	}

	componentDidMount() {
		const initializeStore = new Promise((resolve, reject) => {
			resolve(this.props.dispatch(asyncPopulatePlacesFromDB()))
		})
			.then(() => {
				//build generic infowindow which will be reused at each instance to prevent multiple instances
				this.largeInfowindow = new google.maps.InfoWindow();
				this.props.dispatch(loadInfoWindow(new google.maps.InfoWindow())) //unused
			})
			.then(() => {
				//create the default icon types to be used for markers
				this.generateMarkerIcons(icons);
			})
			.then(() => {
        		//build markers and associate them with custom infowindows and color schemes, populate an array of them
        		//later calls to the database will take the place of static placesArray (prior to the that, need to use static API JSON file)
				this.buildMarkers(this.props.maps.placesArray)
			})



	}

	//CURRENTLY UNUSED
	selectMapMarker(place) {
		//locate corresponding marker when place is selected to highlight it
		const selectedMarker = this.props.maps.markersArray.filter((marker, index) => {
			if (marker.id === place.id) {
				return marker;
			}
		});
		//selectedMarker filter returns an array, we only want the first result
		this.props.dispatch(selectMarker(selectedMarker[0].id));
		this.props.dispatch(focusInfoWindow(selectedMarker[0]));
	}

	selectMenuItem(place) {
		//Function passed to Sidebar to allow it to also select marker on the map
		this.highlightSelectedPlace(place.id);
		// this.selectMapMarker(place); not implemented

	}

	highlightSelectedPlace = placeId => {
		//Used to manually select a place from sidebar when clicking on a map marker
		const selectedElems = document.getElementsByClassName('sidebar-place-selected');

		if(selectedElems.length > 0){
			for (let i = 0; i < selectedElems.length; i++) {
				selectedElems[i].classList.remove('sidebar-place-selected', 'sidebar-place-manualHover');
			}
		}
		const placeElem = document.getElementById('place' + placeId);
		placeElem.classList.add('sidebar-place-selected');

	}

	//## FROM Map

	buildMarkers(places) {

		let self = this;
		const markersArray = [];
		for (let i = 0; i < places.length; i++) {

			//marker is created without map reference which is added in Map component after new google map is created
	        const marker = new google.maps.Marker({
				position: places[i].position,
				title: places[i].title,
				address: places[i].address || '',
				rating: places[i].rating || 'none',
				description: places[i].summary || '',
				icon:  this.props.maps.markerIcons[places[i].subCategory] ||this.props.maps.markerIcons[places[i].category]|| this.props.maps.markerIcons.Default, 
				animation: google.maps.Animation.DROP,
				id: places[i].id,
				category: places[i].category
	        });


	        marker.addListener('click', function() {
	        	//this is to fix the multiple highlighted and animated markers. But requires looping through all markers.
	        	//TODO: need to refactor code to start tracking current marker not just its id (which I'm not doing despite the bad variable name)
	        	for (let i in self.props.maps.markersArray) {
	        		self.props.maps.markersArray[i].setAnimation(null)
	        		self.props.maps.markersArray[i].setIcon(self.props.maps.markerIcons[places[i].subCategory] ||self.props.maps.markerIcons[places[i].category]|| self.props.maps.markerIcons.Default);
	        	}

				self.populateInfoWindow(marker, self.largeInfowindow);
				self.highlightSelectedPlace(marker.id);

	        });

	        marker.addListener('mouseover', () => {
	        	document.getElementById('place' + marker.id).classList.add('sidebar-place-manualHover'); //hover PlacesList elem
	        	marker.setIcon(this.props.maps.markerIcons.Highlighted);
	        	this.props.dispatch(asyncHighlightPlace(marker.id));
	        });

	        marker.addListener('mouseout', () => {
	        	//to avoid overwriting the highlighted bouncing effect too soon
	        	if(marker.animation === null){
	        		document.getElementById('place' + marker.id).classList.remove('sidebar-place-manualHover');
	 	        	marker.setIcon(this.props.maps.markerIcons[places[i].subCategory] ||this.props.maps.markerIcons[places[i].category]|| this.props.maps.markerIcons.Default);
	 	        	this.props.dispatch(asyncUnhighlightPlace());
	        	}
	        });

   	        markersArray.push(marker);

        }
        this.props.dispatch(populateMarkers(markersArray));
	}

	//TODO: Detail button inside infowindow not working. Throwing error. Need to fix and then set it to close the infowindow
	//when the detail view loads (separate clearing infowindow into a separate function and track current infowindow in store)

    populateInfoWindow(marker, infowindow) {
    	if (infowindow.marker != marker) {
    		infowindow.setContent('');
    		infowindow.marker = marker;
    		this.toggleBounce(marker);
    		marker.setIcon(this.props.maps.markerIcons.Highlighted)
    		infowindow.addListener('closeclick', () => {
    			marker.setAnimation(null);
    			marker.setIcon(this.props.maps.markerIcons[marker.subCategory] || this.props.maps.markerIcons[marker.category] || this.props.maps.markerIcons.Default);
    			infowindow.marker = null;
    		});
    	const id = 'place' + marker.id;
    	const newContent = `<div class="iwContainer"> 
    	    	    							 <div class="iwTitle">${marker.title}</div>
    	    	    							 <br/>
    	    	    							 <div class="iwDescription">${marker.description}</div>
    	    	    							 <br/>
    	    	    							 <div class="iwAddress">Address: ${marker.address}</div>
    	    	    							 <a class="btn btn-primary" onClick=${(e) => {this.props.dispatch(viewPlacescreen(id))}}>Detail</a>
    	    	    						</div>`;
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

	generateMarkerIcons(iconsObject){
		for (let icon in iconsObject) {
			this.props.dispatch(addMarkerIcon(icon, this.makeMarkerIcon(iconsObject[icon].color)));
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

    renderPlacescreen(){
    	//Because react doesn't let you pass an object as a child, array.filter returns an array with one element
    	//whereas array.find would return the object itself. I then extract the first element in the child component
    	const currentPlace = this.props.maps.placesArray.filter((place) => {
    		return place.id === this.props.maps.placescreenID
    	})


    	return (
    		<Placescreen
    			place={currentPlace}
    			dispatch={this.props.dispatch}
    		>
    		</Placescreen>
    	)
    }

	render(){
		if (this.props.maps.placesArray.length > 0 ) {
			return (
				<div id="app-wrapper">
					<div id="map-component">
						{this.props.maps.placescreenActive ? this.renderPlacescreen() : false}
						<Mapscreen
							markers={this.props.maps.markersArray}
						/>
					</div>
					<div id="sidebar-component">
						<Sidebar
							selectMenuItem={this.selectMenuItem}
						/>
					</div>
				</div>
			)
		}
		else {
			return (
				<div>'error: could not load from database'</div>
			)
		}

	}
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  };
}

export default connect(mapStateToProps)(App);
