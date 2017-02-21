import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar';
import Mapscreen from './components/Map';
import Placescreen from './components/Placescreen';
import Formscreen from './components/Formscreen';
import {connect} from 'react-redux';
import {
    updatePlaces,
} from './actions/actions';
import placesFromDB from './api/places.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
    constructor(props) {
        super(props)
    }

    highlightSelectedPlace = placeId => {
        //Used to manually select a place from sidebar when clicking on a map marker
        const selectedElems = document.getElementsByClassName('sidebar-place-selected');

        if (selectedElems.length > 0) {
            for (let i = 0; i < selectedElems.length; i++) {
                selectedElems[i].classList.remove('sidebar-place-selected', 'sidebar-place-manualHover');
            }
        }
        const placeElem = document.getElementById('place' + placeId);
        placeElem.classList.add('sidebar-place-selected');

    }    

    componentDidMount() {
		this.props.dispatch(updatePlaces(placesFromDB))
    }

    renderPlacescreen() {
        //Because react doesn't let you pass an object as a child, array.filter returns an array with one element
        //whereas array.find would return the object itself. I then extract the first element in the child component
        const currentPlace = this.props.maps.placesArray.filter((place) => {
            return place.id === this.props.maps.placescreenID
        })

        return (
          <Placescreen
              key = {currentPlace.id}
              place = {currentPlace}
              dispatch = {this.props.dispatch}>
          </Placescreen>
        )
    }

    render() {
        if (this.props.maps.placesArray.length > 0) {
            return (
                <div id="app-wrapper">
                  <div id="map-component">
                      <ReactCSSTransitionGroup
                          transitionName = "example"
                          transitionEnterTimeout = {800}
                          transitionLeaveTimeout = {300}>
                          {this.props.maps.placescreenActive ? this.renderPlacescreen() : false}
                      </ReactCSSTransitionGroup>
                      <Mapscreen 
                      	highlightSelectedPlace = {this.highlightSelectedPlace}
                      	filteredPlaces = {this.props.maps.filteredPlaces}
                      	filterActive = {this.props.maps.filterActive}
                      	placesArray = {this.props.maps.placesArray}
                      />
                  </div>
                  <div id="sidebar-component">
                      <Sidebar 
                      	selectMenuItem = {this.selectMenuItem}
                      	highlightSelectedPlace = {this.highlightSelectedPlace}
                      />
                  </div>
                </div>
            )
        } else {
            return ( <div>'error: could not load from database'</div> )
        }
    }

}

function mapStateToProps(state) {
    return {
        maps: state.maps
    };
}

export default connect(mapStateToProps)(App);
