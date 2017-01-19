import React, { Component } from 'react';
import {asyncPopulatePlacesList, viewPlacescreen} from '../actions/actions';
import {connect} from 'react-redux';
import Collapsible from './Collapsible';
import icons from '../media/inlineIcons'; //could also pass this down from app now instead of importing twice (import if moved server side)

class Sidebar extends Component {
	constructor(props){
		super(props)

	}
	//TODO add higher level function here to pass to Collapsible using handleTriggerClick property
	//to store the clicked item so that it can be remembered and closed before the next one is opened


	showPlaces(placesArray) {

		const placesList = [];
		for (let i = 0; i < placesArray.length; i++) {

			const category = placesArray[i].category,
				subCategory = placesArray[i].subCategory;
			const iconPath = icons[subCategory] || icons[category] || icons["Default"];

			//Dirty code to build trigger with SVG icons from map-icons.com
			//TODO is to color coordinate these with markers. Also to have both pull from the same source ultimately.
			//TODO separate into component
			const iconClassName = `sidebar-icon sidebar-icon-${subCategory || category || 'Default' }`
			const svgIcon = <svg className={iconClassName} style={{fill: iconPath['color']}} key={i} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" overflow="inherit"><path d={iconPath['path']}/></svg>;
			const triggerText = [svgIcon, placesArray[i].title ];

			const id = Number(JSON.stringify(JSON.parse(i))) + 1 //NOTE: So callbacks reference the current value of i not the final value
			const placeId = 'place' + id //NOTE: id and array position are off by one.
			placesList.push(

				<div
					key={i}
					className='sidebar-place'
					id={placeId}
					onClick={()=> this.props.selectMenuItem(placesArray[i])}
					onMouseOver={() => this.props.maps.markersArray[i].setIcon(this.props.maps.markerIcons.Highlighted)}
					onMouseOut={() => this.props.maps.markersArray[i].setIcon(this.props.maps.markerIcons[placesArray[i].subCategory] || this.props.maps.markerIcons[placesArray[i].category] || this.props.maps.markerIcons.Default)}
				>
					<Collapsible
						trigger={ triggerText }
						transitionTime={150}
						classParentString={'collapsible-container'}
					>
						<p>{placesArray[i].summary}</p>
						<a className="btn btn-primary" onClick={(e) => this.props.dispatch(viewPlacescreen(id))}>Detail</a>
					</Collapsible>
				</div>

			)
		}
		return placesList;
	}


	//############## Lifecycle Functions ##########################

	componentDidMount() {

		let placesBuild = new Promise( (resolve, reject) => {
					resolve(this.props.dispatch(asyncPopulatePlacesList(this.showPlaces(this.props.maps.placesArray))))
			})
		//still trying to figure out best way to add eventlisteners after places are populated, promise or thunk or both
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
