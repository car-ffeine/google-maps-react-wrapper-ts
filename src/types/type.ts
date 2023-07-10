export type StationsRequest = {
  lng: number,
  lat: number,
  deltaX: number,
  deltaY: number
}

export type Station = {
  id: number,
  lat: number,
  lng: number,
  title: string
}
