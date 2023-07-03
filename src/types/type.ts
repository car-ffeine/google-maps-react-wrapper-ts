export type MarkersRequest = {
  lng: number,
  lat: number,
  deltaX: number,
  deltaY: number
}

export type Marker = {
  id: number,
  lat: number,
  lng: number,
  title: string
}
