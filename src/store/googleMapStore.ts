import { store } from "../utils/x-state";
import { googleMarkersAction } from "./googleMarkersStore";

type googleMapType = google.maps.Map | undefined;
export const googleMapStore = store<googleMapType>(undefined);
export const googleMapActions = {
  setMap: (newMap: google.maps.Map) => {
    googleMapStore.setState(newMap);
    const googleMap = googleMapStore.getState() as google.maps.Map;
    googleMap.addListener("dragend", () => {
      console.log("center is changed. try to re-fetch!");
      googleMarkersAction.getMarkers();
    });
    googleMap.addListener("zoom_changed", () => {
      console.log("zoom is changed. try to re-fetch!");
      googleMarkersAction.getMarkers();
    });

    /**
     * 최초 1회 바운드 값 설정 이후에 마커를 요청한다. 이후에 스스로 제거 처리됨
     */
    const initMarkersEvent = googleMap.addListener('bounds_changed', () => {
      console.log("==========bounds are changed. try to fetch!==========");
      googleMarkersAction.getMarkers();
      google.maps.event.removeListener(initMarkersEvent)
    })
  },

};
