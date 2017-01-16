export function reset() {
  return {
    type: 'RESET',
    payload: ''
  }
}

export function populateMarkers(markersArray) {
  return {
    type: 'POPULATE_MARKERS',
    payload: markersArray
  }
}

export function populatePlacesList(placesList) {
  return {
    type: 'POPULATE_PLACESLIST',
    payload: placesList
  }
}

export function loadInfoWindow(infoWindow) {
  return {
    type: 'LOAD_INFOWINDOW',
    payload: infoWindow
  }
}

export function highlightPlace(placeID) {
  return {
    type: 'HIGHLIGHT_PLACE',
    payload: placeID
  }
}
export function unhighlightPlace() {
  return {
    type: 'UNHIGHLIGHT_PLACE',
  }
}
export function selectMarker(markerID) {
  return {
    type: 'SELECT_MARKER',
    payload: markerID
  }
}

export function deselectMarker() {
  return {
    type: 'DESELECT_MARKER',
  }
}

export function addMarkerIcon(key, icon) {
  return {
    type: 'ADD_MARKERICON',
    key: key,
    icon: icon
  }
}

export function focusInfoWindow(marker) {
  return {
    type: 'FOCUS_INFOWINDOW',
    payload: marker
  }
}

export function clearInfoWindow(){
  return {
    type: 'CLEAR_INFOWINDOW'
  }
}

export function asyncHighlightPlace(placeID) {
  return function (dispatch) {
    dispatch(highlightPlace(placeID));
  }
}

export function asyncUnhighlightPlace(placeID) {
  return function (dispatch) {
    dispatch(unhighlightPlace());
  }
}

export function asyncPopulatePlacesList(placesList) {
  return function (dispatch) {
    dispatch(populatePlacesList(placesList));
  }
}

export function asyncAddMarkerIcon(key, icon) {
  return function (dispatch) {
    dispatch(addMarkerIcon(key, icon));
  }
}

export function asyncSelectMenuItem() {
  return
}