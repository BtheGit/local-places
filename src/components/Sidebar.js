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
	};

	buildSidebarPlaces = (placesArray) => {
		for (let i = 0; i < placesArray.length; i++) {
			const category = placesArray[i].category;
			const subCategory = placesArray[i].subCategory;
			const iconPath = icons[subCategory] || icons[category] || icons['Default'];
			const iconClassName = `sidebar-icon sidebar-icon-${subCategory || category || 'Default' }`
			const svgIcon = (<svg className={iconClassName} style={{fill: iconPath['color']}} key={i} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-293.5 385 18 21" overflow="inherit">
			<path d="M-275.5,394c0-5-4-9-9-9s-9,4-9,9c0,3.6,2.1,6.6,5.1,8.1l3.9,3.9l3.9-3.9C-277.6,400.6-275.5,397.6-275.5,394z"/>
			</svg>);
			const triggerText = [ svgIcon, placesArray[i].title ];
			const id = placesArray[i].id;
			const placeId = 'place' + id;

			placesArray[i]['sidebar'] = (
				<Collapsible
					key={i}
					//passed to Collapsible
					trigger={ triggerText }
					transitionTime={150}
					classParentString={'collapsible-container'}
					placeId={placeId}

					//passed through to SidebarPlace
					iterKey={i}
					place={placesArray[i]}
					highlightSelectedPlace={this.props.highlightSelectedPlace}
					dispatch={this.props.dispatch}
				/>
			)

		}

		return placesArray;

	};

	showPlaces = (placesArray) => {
		return placesArray.map((place) => {
			return place.sidebar;
		})
	};


	//############## Lifecycle Functions ##########################

	componentDidMount() {

		this.props.dispatch(
			updatePlaces(
				this.buildSidebarPlaces(
					this.props.maps.placesArray)
			)
		)
	};

	render() {
		return (
			<div id="sidebar-container">
				<SearchBox></SearchBox>
				<div id="sidebar-list-container">
					{this.props.maps.filterActive && this.props.maps.searchActive ?
						this.showPlaces(this.props.maps.foundPlaces) :
						this.props.maps.searchActive ?
							this.showPlaces(this.props.maps.foundPlaces) :
							this.props.maps.filterActive ?
								this.showPlaces(this.props.maps.filteredPlaces) :
								this.showPlaces(this.props.maps.placesArray)
					}
				</div>
			</div>

		)
	};
};

function mapStateToProps(state) {
  return {
    maps: state.maps
  };
};

export default connect(mapStateToProps)(Sidebar);
