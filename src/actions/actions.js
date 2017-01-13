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

export function asyncHighlightPlace(placeID) {
  return function (dispatch) {
    dispatch(highlightPlace(placeID));
    console.log('highlighted')
  }
}