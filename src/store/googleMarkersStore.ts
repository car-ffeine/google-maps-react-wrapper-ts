import { store } from "../utils/x-state";
import { markers } from "../data/markers";
import { googleMapStore } from "./googleMapStore";

export const googleMarkersStore = store<google.maps.Marker[]>([]);

export const googleMarkersAction = {
  getMarkers: async () => {
    /**
     * TODO: 재요청 시 기존 마커를 메모리에서 제거하는 작업이 필요할수도 있다고 생각함
     */
    const googleMap = googleMapStore.getState();
    if (!googleMap) return null;

    console.log(googleMap.getBounds()) // 문제가 되는 시점. 1회 저장 혹은 화면 1회 이동 이후(리프레시 이후)에는 정상 동작함

    const center = googleMap.getCenter() as google.maps.LatLng;
    const bounds = googleMap.getBounds() as google.maps.LatLngBounds;

    console.log(`new lnglat: ${center}`);
    console.log(`new bounds: ${bounds}`);

    const deltaX = (bounds?.getNorthEast().lng() - bounds?.getSouthWest().lng()) / 2;
    const deltaY = (bounds?.getNorthEast().lat() - bounds?.getSouthWest().lat()) / 2;
    const centerX = center.lng();
    const centerY = center.lat();


    // const response = await fetch('/getMarkers', {
    //   method: "POST",
    //   body: JSON.stringify({
    //     lng: centerX,
    //     lat: centerY,
    //     deltaX,
    //     deltaY
    //   })
    // })

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
