import { action, store } from "../utils/x-state";
import {markers} from "../data/markers";
type googleMapType = google.maps.Map | undefined
export const googleMapStore = store<googleMapType>(undefined);
type googleMapActionType = {
  setMap: (newMap: google.maps.Map) => void,
  getMarkers:()=>void,
}
export const googleMapActions = action<googleMapType, googleMapActionType>(
  ({ get, set }) => ({
    setMap: (newMap: google.maps.Map) => {
      set(googleMapStore, newMap);
    },
    getMarkers : () => {
      /**
       * TODO: 재요청 시 기존 마커를 메모리에서 제거하는 작업이 필요할수도 있다고 생각함
       */
      const googleMap = get(googleMapStore);
      console.log(`fetch data by new lnglat: ${googleMap?.getCenter()}`)
      markers.forEach((marker)=>{
        const newMarker = new google.maps.Marker({
          position: {lat: marker.lat, lng: marker.lng},
          map: googleMap,
          title: `${marker.title}`,
        });

        newMarker.addListener('click', () =>{
          console.log('marker clicked!', marker);
          if(googleMap){
            googleMap.panTo({lat: marker.lat, lng: marker.lng})
          }
        })
      })
    }
  })
);

