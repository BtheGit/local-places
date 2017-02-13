import React, { Component } from 'react';
import {
	updatePlaces,
	viewPlacescreen
} from '../actions/actions';
import {connect} from 'react-redux';
import Collapsible from './Collapsible';
import SearchBox from './SearchBox';
import icons from '../media/inlineIcons'; //could also pass this down from app now instead of importing twice (import if moved server side)

class Sidebar extends Component {
	constructor(props){
		super(props)

	}
	buildSidebarPlaces(placesArray) {
		for (let i = 0; i < placesArray.length; i++) {

			const category = placesArray[i].category,
				subCategory = placesArray[i].subCategory;
			const iconPath = icons[subCategory] || icons[category] || icons["Default"];

			//Dirty code to build trigger with SVG icons from map-icons.com
			//TODO is to color coordinate these with markers. Also to have both pull from the same source ultimately.
			//TODO separate into component
			const iconClassName = `sidebar-icon sidebar-icon-${subCategory || category || 'Default' }`
			const svgIcon = (<svg className={iconClassName} style={{fill: iconPath['color']}} key={i} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-293.5 385 18 21" overflow="inherit">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M-275.5,394c0-5-4-9-9-9s-9,4-9,9c0,3.6,2.1,6.6,5.1,8.1l3.9,3.9l3.9-3.9C-277.6,400.6-275.5,397.6-275.5,394z"/>
			</svg>);
			const triggerText = [ svgIcon, placesArray[i].title ];

			const id = placesArray[i].id; 
			const placeId = 'place' + id; 
			placesArray[i]['sidebar'] = (


					<Collapsible
						trigger={ triggerText }
						transitionTime={150}
						classParentString={'collapsible-container'}
						idParentString={placeId}
					>
						<div
							key={i}
							className='sidebar-place'
							// id={placeId}
							onClick={()=> this.props.highlightSelectedPlace(id)}
							onMouseOver={() => this.props.maps.placesArray[i].marker.setIcon(this.props.maps.markerIcons.Highlighted)}
							onMouseOut={() => this.props.maps.placesArray[i].marker.setIcon(this.props.maps.markerIcons[placesArray[i].subCategory] || this.props.maps.markerIcons[placesArray[i].category] || this.props.maps.markerIcons.Default)}
						>					
							<p>{placesArray[i].summary}</p>
							<a className="btn btn-primary" onClick={(e) => this.props.dispatch(viewPlacescreen(id))}>+ Detail</a>
						</div>
					</Collapsible>

			)

		}
		return placesArray;
	}

	showPlaces = (placesArray) => {
		return placesArray.map((place) => {
			return place.sidebar;
		})
	}

	// buildSidebarPlaces(placesArray) {
	// 	for (let i = 0; i < placesArray.length; i++) {

	// 		const category = placesArray[i].category,
	// 			subCategory = placesArray[i].subCategory;
	// 		const iconPath = icons[subCategory] || icons[category] || icons["Default"];

	// 		//Dirty code to build trigger with SVG icons from map-icons.com
	// 		//TODO is to color coordinate these with markers. Also to have both pull from the same source ultimately.
	// 		//TODO separate into component
	// 		const iconClassName = `sidebar-icon sidebar-icon-${subCategory || category || 'Default' }`
	// 		const svgIcon = (<svg className={iconClassName} style={{fill: iconPath['color']}} key={i} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-293.5 385 18 21" overflow="inherit">
	// 		<path fill-rule="evenodd" clip-rule="evenodd" d="M-275.5,394c0-5-4-9-9-9s-9,4-9,9c0,3.6,2.1,6.6,5.1,8.1l3.9,3.9l3.9-3.9C-277.6,400.6-275.5,397.6-275.5,394z"/>
	// 		</svg>);
	// 		const triggerText = [ svgIcon, placesArray[i].title ];

	// 		const id = placesArray[i].id; 
	// 		const placeId = 'place' + id; 
	// 		placesArray[i]['sidebar'] = (

	// 			<div
	// 				key={i}
	// 				className='sidebar-place'
	// 				// id={placeId}
	// 				onClick={()=> this.props.highlightSelectedPlace(id)}
	// 				onMouseOver={() => this.props.maps.placesArray[i].marker.setIcon(this.props.maps.markerIcons.Highlighted)}
	// 				onMouseOut={() => this.props.maps.placesArray[i].marker.setIcon(this.props.maps.markerIcons[placesArray[i].subCategory] || this.props.maps.markerIcons[placesArray[i].category] || this.props.maps.markerIcons.Default)}
	// 			>
	// 				<Collapsible
	// 					trigger={ triggerText }
	// 					transitionTime={150}
	// 					classParentString={'collapsible-container'}
	// 					idParentString={placeId}
	// 				>
	// 					<p>{placesArray[i].summary}</p>
	// 					<a className="btn btn-primary" onClick={(e) => this.props.dispatch(viewPlacescreen(id))}>+ Detail</a>
	// 				</Collapsible>
	// 			</div>

	// 		)

	// 	}
	// 	return placesArray;
	// }


	//############## Lifecycle Functions ##########################

	componentDidMount() {
		this.props.dispatch(
			updatePlaces(
				this.buildSidebarPlaces(
					this.props.maps.placesArray)
				)
			)
	}

	render() {
		return (
			<div id="sidebar-container">
				<SearchBox></SearchBox>
				<div id="sidebar-list-container">
					{this.showPlaces(this.props.maps.placesArray)}
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
