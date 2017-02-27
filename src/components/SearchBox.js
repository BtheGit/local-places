import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	searchPlaces,
	clearSearch,
	clearFilter,
	applyFilter
} from '../actions/actions';

class SearchBox extends Component {
	constructor(props){
		super(props)
	}

	filterSearch = (event) => {
		//BUG: If user types ' ' first, throws an error

		//Reset filterActive toggle so Markers and Sidebar generate based on default array not filtered array
		if (event.target.value === '') {
			this.props.dispatch(clearSearch());
			return
		}

		const text = event.target.value.toLowerCase();
		//Create array of search terms
		const textArray = text.split(" ")
							  .filter(i => i); //this is a trick to filter out empty strings
		let filtered = [];

		//Populate filtered with arrays of matches for each search term individually
		for (let i = 0; i < textArray.length; i++) {
			//if filter is active, use the filteredPlaces as the base for searches, else use all the places
			const array = this.props.maps.filterActive ? this.props.maps.filteredPlaces : this.props.maps.placesArray; 
			
			filtered.push(wordFilter(textArray[i], array))
		}

		//Compare list of matches lists and save only the intersections (ones that are common to all)
		if (filtered.length > 1) {
			filtered = intersect(filtered);
			this.props.dispatch(searchPlaces([...filtered]));
		} else if (filtered.length === 1){ 
			if (filtered[0][0] !== ''){ //to avoid adding empty string to filtered list in store
				this.props.dispatch(searchPlaces(filtered[0]));
			}
		} 

		//TODO add in search of category, subcategory, and tags (which needs to be joined into one string)
		function wordFilter (text, array) {
			return array.filter((elem) => {
				if (elem.title !== undefined && elem.description !== undefined) {
					return elem.title.toLowerCase().includes(text) || elem.description.toLowerCase().includes(text)
				} else if (elem.title !== undefined) {
					return elem.title.toLowerCase().includes(text)
				} else if (elem.description !== undefined) {
					return elem.description.toLowerCase().includes(text)
				}
				
			})
		}


		function intersect(array) {
			let a = new Set(array[0]);
			for (let i = 1; i < array.length; i++) {
				let b = new Set(array[i]);
				let intersection = new Set([...a].filter(x => b.has(x)));				
				a = [...intersection]; //converts Set of intersections back into array
			}
			return a;
		}

		//TODO: change markers to render based on filteredPlaces, not placesArray (if filteredPlaces is empty, render placesArray)
	}

	//The filter will function more as a category than a standard filter. Applying it or removing it will reset searches,
	//similar to going to a sub-category page in Tripadvisor.
	applyFilter = (event) => {
		const filter = event.target.value;
		//reset search filter 
		this.props.dispatch(clearSearch());
		//set filterActive to false if 'all' is value, otherwise to true
		if (filter === 'all') {
			this.props.dispatch(clearFilter());
		} else {
			//create a new array filtered only by category 
			//dispatch that array to the filteredPlaces (without triggering the searchActive toggle)                       
			const filteredPlaces = this.props.maps.placesArray.filter(place => place.category.match(filter));
			this.props.dispatch(applyFilter(filter, filteredPlaces))
		}

	}

	//TODO move rendering of select form to separate function

	render() {
		return (
			<div>
				<div id="sidebar-search">
					<input 
						type="text"
						onInput={this.filterSearch} 
						className="search-input" 
						placeholder="Search" 
					/>
					<a href="#" className="search-button">Search</a>
				</div>
				<div>
					<select onChange={this.applyFilter}>
						<option value="all">All</option>
						<option value="Food">Food</option>
						<option value="Nature">Outdoors</option>
						<option value="Recreation">Recreation</option>
						<option value="Medical">Medical</option>
					</select>
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

export default connect(mapStateToProps)(SearchBox);
