import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	filterPlaces,
	clearFilter
} from '../actions/actions';

class SearchBox extends Component {
	constructor(props){
		super(props)
	}

	filterSearch = (event) => {
		//BUG: If user types ' ' first, throws an error

		//Reset filterActive toggle so Markers and Sidebar generate based on default array not filtered array
		if (event.target.value === '') {
			this.props.dispatch(clearFilter());
			return
		}

		const text = event.target.value.toLowerCase();
		//Create array of search terms
		const textArray = text.split(" ")
							  .filter(i => i); //this is a trick to filter out empty strings
		let filtered = [];

		//Populate filtered with arrays of matches for each search term individually
		for (let i = 0; i < textArray.length; i++) {
			filtered.push(wordFilter(textArray[i], this.props.maps.placesArray))
		}

		//Compare list of matches lists and save only the intersections (ones that are common to all)
		if (filtered.length > 1) {
			filtered = intersect(filtered);
			this.props.dispatch(filterPlaces([...filtered]));
		} else if (filtered.length === 1){ 
			if (filtered[0][0] !== ''){ //to avoid adding empty string to filtered list in store
				this.props.dispatch(filterPlaces(filtered[0]));
			}
		} 


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

	render() {
		return (
			<div id="sidebar-search">
				<input 
					type="text"
					onInput={this.filterSearch} 
					className="search-input" 
					placeholder="Search" 
				/>
				<a href="#" className="search-button">Search</a>
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
