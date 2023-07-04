import { googleMapStore } from "./googleMapStore";
import { Marker, MarkersRequest } from "../types/type";
import {store} from "external-state";

export const googleMarkersStore = store<google.maps.Marker[]>([]);

export const googleMarkersAction = {
  getMarkers: async () => {
    /**
     * TODO: 재요청 시 기존 마커를 메모리에서 제거하는 작업이 필요할수도 있다고 생각함
     */

    const googleMap = googleMapStore.getState();
    if (!googleMap) return null;

    const center = googleMap.getCenter() as google.maps.LatLng;
    const bounds = googleMap.getBounds() as google.maps.LatLngBounds;

    const deltaX = (bounds?.getNorthEast().lng() - bounds?.getSouthWest().lng()) / 2;
    const deltaY = (bounds?.getNorthEast().lat() - bounds?.getSouthWest().lat()) / 2;
    const centerX = center.lng();
    const centerY = center.lat();


    const response = await fetch('/getMarkers', {
      method: "POST",
      body: JSON.stringify({
        lng: centerX,
        lat: centerY,
        deltaX,
        deltaY
      } as MarkersRequest)
    })
    const markers: Marker[] = await response.json();


    const newMarkers = markers.map((marker) => {
      const newMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: googleMap,
        title: `${marker.title}`,
      });

      newMarker.addListener('click', () => {
        console.log('marker clicked!', marker);
        if (googleMap) {
          googleMap.panTo({ lat: marker.lat, lng: marker.lng })
          googleMarkersAction.getMarkers();
        }
      });

      return newMarker;
    })

    googleMarkersAction.removeAllMarkers();

    googleMarkersStore.setState(newMarkers);
  },
  removeAllMarkers: () => {
    const markers = googleMarkersStore.getState();
    markers.forEach((marker) => marker.setMap(null));
    googleMarkersStore.setState([]);
  }
}
