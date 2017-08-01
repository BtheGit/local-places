const initialState = {
    startLocation: {lat: 22.624695, lng: 120.307813},
    zoomLevel: 13,
    markerIsSelected: false,
    selectedMarker: 0,
    placesArray: [],
    filterOptions: [
      { value: 'all', label: 'All'},
      { value: 'Food', label: 'Food'},
      { value: 'Nature', label: 'Outdoors'},
      { value: 'Recreation', label: 'Recreation'},
      { value: 'Medical', label: 'Medical'}
    ],
    styles: {
      default: [],
      brendan: [
        {"stylers": [{"saturation": 5}]},
        {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#3ec7c9"}]},
        {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}, {"saturation": -20}]},
      ],
      mondrian: [
         {"elementType":"labels","stylers":[{"visibility":"off"}]},
         {"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#0F0919"}]},
         {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#E4F7F7"}]},
         {"elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
         {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#002FA7"}]},
         {"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#E60003"}]},
         {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#FBFCF4"}]},
         {"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#FFED00"}]},
         {"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#D41C1D"}]},
         {"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#BF0000"}]},
         {"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"saturation":-100}]}
        ],
      grayscaleLight: [
         {"featureType": "administrative","elementType": "all","stylers": [{"saturation": "-100"}]},
         {"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},
         {"featureType": "landscape","elementType": "all","stylers": [{"saturation": -100},{"lightness": 65},{"visibility": "on"}]},
         {"featureType": "poi","elementType": "all","stylers": [{"saturation": -100},{"lightness": "50"},{"visibility": "simplified"}]},
         { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": "-100" } ] },
         { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] },
         { "featureType": "road.arterial", "elementType": "all", "stylers": [ { "lightness": "30" } ] },
         { "featureType": "road.local", "elementType": "all", "stylers": [ { "lightness": "40" } ] },
         { "featureType": "transit", "elementType": "all", "stylers": [ { "saturation": -100 }, { "visibility": "simplified" } ] },
         { "featureType": "water", "elementType": "geometry", "stylers": [ { "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 } ] },
         { "featureType": "water", "elementType": "labels", "stylers": [ { "lightness": -25 }, { "saturation": -100 } ] }
      ]
    },
    currentMapStyle: 'default',
    filterActive: false,
    filterType: '',
    searchActive: false,
    filteredPlaces: [],
    foundPlaces: [],
    // highlightedPlaceID: '',
    markerIcons: {},
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
    case 'SEARCH_PLACES':
      return({
        ...state,
        searchActive: true,
        foundPlaces: action.payload
      })
    case 'CLEAR_SEARCH':
      return({
        ...state,
        searchActive: false
      })
    case 'APPLY_FILTER':
      return({
        ...state,
        filterActive: true,
        filterType: action.type,
        filteredPlaces: action.filteredPlaces
      })
    case 'CLEAR_FILTER':
      return({
        ...state,
        filterActive: false
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
    case 'CHANGE_MAP_STYLE':
      return({
        ...state,
        currentMapStyle: action.payload
      })
    default:
      return state;
  }
}

export default maps;
