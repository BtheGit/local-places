export function reset() {
  return {
    type: 'RESET',
    payload: answer
  }
}

export function selectMarker(marker) {
  return {
    type: 'SELECT_MARKER',
    payload: marker
  }
}

export function deselectMarker() {
  return {
    type: 'DESELECT_MARKER',
  }
}