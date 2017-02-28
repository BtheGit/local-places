import React, { Component } from 'react';
import { connect } from 'react-redux';
import icons from '../media/inlineIcons';
import {
    updatePlaces,
    selectMarker,
    focusInfoWindow,
    populateMarkers,
    addMarkerIcon,
    viewPlacescreen
} from '../actions/actions';

class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			map: '',
			loaded: false
		}
        this.infowindowButtonOnClick = this.infowindowButtonOnClick.bind(this);

	}

	buildMap() {
        const map = new google.maps.Map(this.refs.map, {
          center: this.props.maps.startLocation,
          zoom: this.props.maps.zoomLevel,
          mapTypeControl: false,
          styles: this.props.maps.styles[this.props.maps.currentMapStyle]
        });
        this.setState({map})
	}

	//Markers are generated before the Google map. This injects the map reference into each marker after the map is generated.
 	connectMarkers(placesArray, map) {
 		return placesArray.map(function(place) {
 			return place.marker.setMap(map)
 		})
 	}

    //## FROM Map

    buildMarkers(places) {

        let self = this;
        for (let i = 0; i < places.length; i++) {

            //marker is created without map reference which is added in Map component after new google map is created
            const marker = new google.maps.Marker({
                position: places[i].position,
                title: places[i].title,
                thumbnail: places[i].imagesArray[0] || '',
                address: places[i].address || '',
                rating: places[i].rating || 'none',
                description: places[i].summary || '',
                icon: this.props.maps.markerIcons[places[i].subCategory] || this.props.maps.markerIcons[places[i].category] || this.props.maps.markerIcons.Default,
                animation: google.maps.Animation.DROP,
                id: places[i].id,
                category: places[i].category
            });


            marker.addListener('click', function() {
                //this is to fix the multiple highlighted and animated markers. But requires looping through all markers.
                for (let i in self.props.maps.placesArray) {
                    self.props.maps.placesArray[i].marker.setAnimation(null)
                    self.props.maps.placesArray[i].marker.setIcon(self.props.maps.markerIcons[places[i].subCategory] || self.props.maps.markerIcons[places[i].category] || self.props.maps.markerIcons.Default);
                }

                self.populateInfoWindow(marker, self.largeInfowindow);
                self.props.highlightSelectedPlace(marker.id);

            });

            marker.addListener('mouseover', () => {
                document.getElementById('place' + marker.id).classList.add('manual-hover'); //hover PlacesList elem
                marker.setIcon(this.props.maps.markerIcons.Highlighted);
            });

            marker.addListener('mouseout', () => {
                //to avoid overwriting the highlighted bouncing effect too soon
                if (marker.animation === null) {
                    document.getElementById('place' + marker.id).classList.remove('manual-hover');
                    marker.setIcon(this.props.maps.markerIcons[places[i].subCategory] || this.props.maps.markerIcons[places[i].category] || this.props.maps.markerIcons.Default);
                }
            });

            places[i]['marker'] = marker;

        }
        this.props.dispatch(updatePlaces(places));
    }

    infowindowButtonOnClick(marker) {
        this.props.dispatch(viewPlacescreen(marker.id));
    }

    populateInfoWindow(marker, infowindow) {

        var self = this;

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

            //if there is an image available it will be used as a thumbnail
            //adding the ternary this way meant the infowindow didn't rener an empty block where an image should be
            const thumbnail = marker.thumbnail ? `<img class="iwThumbnail" src="${marker.thumbnail}" alt="" />` : '';
            const id = 'place' + marker.id;
            const newContent = `<div class="iwContainer">
    	    	    							 <div class="iwTitle">${marker.title}</div>
    	    	    							 ${thumbnail}
    	    	    							 <br/>
    	    	    							 <div class="iwDescription">${marker.description}</div>
    	    	    							 <br/>
    	    	    							 <div class="iwAddress">Address: ${marker.address}</div>
    	    	    							 <a class="btn btn-primary" id="infowindowDetailButton">Detail</a>
    	    	    						</div>`;
            infowindow.setContent(newContent);
            infowindow.open(map, marker);

            //infowindow button click function needs to be attached when the infowindow is changed and attaches to the DOM
            const detailButton = document.getElementById('infowindowDetailButton');
            detailButton.addEventListener('click', function() {
                self.infowindowButtonOnClick(marker);
            });
        }
    }


    toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    generateMarkerIcons(iconsObject) {
        for (let icon in iconsObject) {
            this.props.dispatch(addMarkerIcon(icon, this.makeMarkerIcon(iconsObject[icon].color)));
        }
    }

    makeMarkerIcon(markerColor) {
        const newMarker = {
            url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
            size: new google.maps.Size(21, 34),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 34),
            scaledSize: new google.maps.Size(21, 34)
        };

        return newMarker
    }

    //FOR SEARCH AND FILTER

    filterMarkers() {
        //reset all markers to visible
		for (let i = 0; i < this.props.maps.placesArray.length; i++) {
	    		this.props.maps.placesArray[i].marker.setMap(this.state.map)
	    	}

        //select correct array to filter markers based on
        const filterArray = this.props.maps.filterActive && this.props.maps.searchActive ?
                        this.props.maps.foundPlaces :
                        this.props.maps.searchActive ?
                            this.props.maps.foundPlaces :
                            this.props.maps.filterActive ?
                                this.props.maps.filteredPlaces :
                                this.props.maps.placesArray

        //Disconnect unwanted markers from map
    	if (this.props.filterActive || this.props.searchActive) {
	    	for (let i = 0; i < this.props.maps.placesArray.length; i++) {
	    		if(!filterArray.includes(this.props.maps.placesArray[i])) {
	    			this.props.maps.placesArray[i].marker.setMap(null)
	    		}
	    	}
    	}
	}


	//+++++++++++++++++REACT LIFECYCLE FUNCTIONS++++++++++++++++++++++++

	componentDidMount() {

        const initializeStore = new Promise((resolve, reject) => {
            resolve()
            })
            .then(() => {
                //build generic infowindow which will be reused at each instance to prevent multiple instances
                //TODO: store this in state
                this.largeInfowindow = new google.maps.InfoWindow();
            })
            .then(() => {
                //create the default icon types to be used for markers
                this.generateMarkerIcons(icons);
            })
            .then(() => {
                //build markers and associate them with custom infowindows and color schemes, populate an array of them
                //later calls to the database will take the place of static placesArray (prior to the that, need to use static API JSON file)
                this.buildMarkers(this.props.maps.placesArray);
            })
            .then(() => {
         		this.buildMap();
            })
            .then(() => {
            	this.connectMarkers(this.props.maps.placesArray, this.state.map);
            	this.setState({loaded: true})
            })

	}

	componentWillUnmount() {
		this.setState({loaded: false})
	}


	render() {
		if (this.state.loaded) {
			this.filterMarkers();
		}
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
