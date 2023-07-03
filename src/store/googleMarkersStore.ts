import { store } from "../utils/x-state";
import { markers } from "../data/markers";
import { googleMapStore } from "./googleMapStore";

export const googleMarkersStore = store<google.maps.Marker[]>([]);

export const googleMarkersAction = {
  getMarkers: () => {
    /**
     * TODO: 재요청 시 기존 마커를 메모리에서 제거하는 작업이 필요할수도 있다고 생각함
     */
    const googleMap = googleMapStore.getState();
    console.log(`fetch data by new lnglat: ${googleMap?.getCenter()}`);

    markers.forEach((marker) => {
      const newMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: googleMap,
        title: `${marker.title}`,
      });

      newMarker.addListener('click', () => {
        console.log('marker clicked!', marker);
        if (googleMap) {
          googleMap.panTo({ lat: marker.lat, lng: marker.lng })
        }
      });
    })
  }
}
