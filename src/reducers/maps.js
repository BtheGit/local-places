const initialState = {
    startLocation: {lat: 22.624695, lng: 120.307813},
    zoomLevel: 13,
    markerIsSelected: false,
    selectedMarker: 0,
    placesArray: [
      {id: 1, title: 'TianA Vietnamese Restaurant', position: {lat: 22.6301162, lng: 120.31294260000004}},
      {id: 2, title: "Brendan's House", position: {lat: 22.624695, lng: 120.307813}},
      {id: 3, title: 'Nanhe Spa', position: {lat: 22.62994914039921, lng: 120.31899869441986}},
      {id: 4, title: "Tobey's Games Cafe", position: {lat: 22.646440050553554, lng: 120.30407756567001}, address: "No. 247, Songjiang St, Sanmin District, Kaohsiung City, Taiwan 807", rating: 4, description: "A great place to play games and chew bubblegum. As long as you're not all out of bubblegum."}
    ],
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
    markersArray: []

};

const maps = (state = initialState, action) => {
  switch(action.type) {
    case 'RESET':
      return ({
        ...state
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
    case 'SELECT_MARKER':
      return ({
        ...state,
        markerIsSelected: true,
        selectedMarker: action.payload
      })
    case 'DESELECT_MARKER':
      return ({
        ...state,
        markerIsSelected: false
      })
    default:
      return state;
  }
}

export default maps;
