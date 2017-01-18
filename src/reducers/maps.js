const initialState = {
    startLocation: {lat: 22.624695, lng: 120.307813},
    zoomLevel: 13,
    markerIsSelected: false,
    selectedMarker: 0,
    placesArray: [],
    styles: [
      // {"elementType":"labels","stylers":[{"visibility":"off"}]},
      // {"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#0F0919"}]},
      // {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#E4F7F7"}]},
      // {"elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
      // {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#002FA7"}]},
      // {"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#E60003"}]},
      // {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#FBFCF4"}]},
      // {"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#FFED00"}]},
      // {"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#D41C1D"}]},
      // {"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#BF0000"}]},
      // {"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"saturation":-100}]}
    ],
    placesList: [],
    highlightedPlaceID: '',
    markersArray: [],
    markerIcons: {},
    infoWindow: '',
    infoWindowIsActive: false,
    activeInfoWindow: {},
    placescreenActive: false,
    placescreenID: 0

};

const maps = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_PLACES':
      return ({
        ...state,
        placesArray: action.payload
      })
    case 'POPULATE_MARKERS':
      return({
        ...state,
        markersArray: action.payload
      })
    case 'POPULATE_PLACESLIST':
      return({
        ...state,
        placesList: action.payload
      })
    case 'LOAD_INFOWINDOW':
      return({
        ...state,
        infoWindow: action.payload
      })
    case 'ADD_MARKERICON':
      return ({
        ...state,
        markerIcons: {
          ...state.markerIcons,
          [action.key]: action.icon
        }
      })
    case 'SELECT_MARKER':
      return ({
        ...state,
        markerIsSelected: true,
        infoWindowIsActive: true,
        selectedMarker: action.payload
      })
    case 'DESELECT_MARKER':
      return ({
        ...state,
        infoWindowIsActive: false,
        markerIsSelected: false,
        selectedMarker: 0
      })
    case 'VIEW_PLACESCREEN':
      return ({
        ...state,
        placescreenActive: true,
        placescreenID: action.payload
      })
    case 'HIDE_PLACESCREEN':
      return({
        ...state,
        placescreenActive: false
      })
    case 'FOCUS_INFOWINDOW':
      return({
        ...state,
        infoWindowIsActive: true,
        activeInfoWindow: action.payload
      })
    case 'CLEAR_INFOWINDOW':
      return({
        ...state,
        infoWindowIsActive: false,
        activeInfoWindow: {}
      })
    default:
      return state;
  }
}

export default maps;
