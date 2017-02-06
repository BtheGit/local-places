import React, { Component } from 'react';
import {connect} from 'react-redux';

class SearchBox extends Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div id="sidebar-search">
				<input type="text" className="search-input" placeholder="Search" />
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
