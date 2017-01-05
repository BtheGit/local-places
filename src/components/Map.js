import React, { Component } from 'react';

export default class Map extends Component {
	constructor(props){
		super(props)

		this.state = {
			defaultMarker: this.makeMarkerIcon('55BB00'),
        	highlightedMarker: this.makeMarkerIcon('FFFF24'),
            markersArray: []

		}
	}

	buildMarkers(markers) {
		let self = this;
		const markersArray = [];
		for (let i = 0; i < markers.length; i++) {

	        const marker = new google.maps.Marker({
	          position: markers[i].position,
	          map: this.map,
	          icon: this.state.defaultMarker,
	          animation: google.maps.Animation.DROP,
	          title: markers[i].title,
	          id: i
	        });

	        markersArray.push(marker);
     
	        marker.addListener('click', function() {
	          self.populateInfoWindow(this, self.largeInfowindow);
	        });

	        marker.addListener('mouseover', () => {
	        	marker.setIcon(this.state.highlightedMarker);
	        });

	        marker.addListener('mouseout', () => {
	        	//to avoid overwriting the highlighted bouncing effect too soon
	        	if(marker.animation === null){
	 	        	marker.setIcon(this.state.defaultMarker);       		
	        	}
	        });        	
        }
        this.setState({markersArray});
	}

    populateInfoWindow(marker, infowindow) {
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
    	infowindow.setContent(marker.title + '!!');
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
		return false;
	}

	componentDidMount() {
		this.largeInfowindow = new google.maps.InfoWindow();

        this.map = new google.maps.Map(this.refs.map, {
          center: this.props.center,
          zoom: this.props.zoom,
          mapTypeControl: false,
          styles: this.props.styles
        });

        this.buildMarkers(this.props.markers)


	}

	componentDidReceiveProps() {

	}

	render() {
		return (
			<div id="map" ref="map" style={{height: '100%'}}></div>
		)
	}
}

