import React, { Component } from 'react';
import {asyncPopulatePlacesList, viewPlacescreen} from '../actions/actions';
import {connect} from 'react-redux';
import Collapsible from '../modules/Collapsible';

class Sidebar extends Component {
	constructor(props){
		super(props)

	}

	showPlaces(placesArray) {
		const placesList = [];
		for (let i = 0; i < placesArray.length; i++) {

			const placeId = 'place' + (i + 1) //id and array position are off by one.
			placesList.push(

				<div
					key={i}
					className='sidebar-place'
					id={placeId}
					onClick={()=> this.props.selectMenuItem(placesArray[i])}
					onMouseOver={() => this.props.maps.markersArray[i].setIcon(this.props.maps.markerIcons.highlighted)}
					onMouseOut={() => this.props.maps.markersArray[i].setIcon(this.props.maps.markerIcons.default)}
				>
					<Collapsible
						trigger={placesArray[i].title}
						transitionTime={150}
						classParentString={'collapsible-container'}
					>
						<p>{placesArray[i].summary}</p>
						<a className="btn btn-primary" onClick={(e) => this.props.dispatch(viewPlacescreen(placeId))}>Detail</a>
					</Collapsible>
				</div>

			)
		}
		return placesList;
	}

	//############### eventlisteners functions #################

	addPlaceListeners(placesArray) {
		let self = this;
		for (let i =0; i < placesArray.length; i++) {
			const id = 'place' + i;
			document.getElementById(id).addEventListener('mouseover', function() {
				self.highlightPlace(i)
			})
		}
	}

	removePlaceListeners(placesArray) {
		let self = this;
		for (let i =0; i < placesArray.length; i++) {
			const id = 'place' + i;
			document.getElementById(id).removeEventListener('mouseover', function() {
				self.highlightPlace(i)
			})
		}

	}

	highlightPlace(key) {
	}


	//############## Lifecycle Functions ##########################

	componentDidMount() {

		let placesBuild = new Promise( (resolve, reject) => {
					resolve(this.props.dispatch(asyncPopulatePlacesList(this.showPlaces(this.props.maps.placesArray))))
			})
		//still trying to figure out best way to add eventlisteners after places are populated, promise or thunk or both
	}

	componentDidReceiveProps() {
		this.addPlaceListeners(this.props.placesArray)

	}

	componentWillUnmount() {
		this.removePlaceListeners(this.props.placesArray)
	}

	render() {
		return (
			<div  id="sidebar-container">
				<div id="sidebar-list-container">
					{this.props.maps.placesList}
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

export default connect(mapStateToProps)(Sidebar);
