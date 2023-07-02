import {action, store} from "../utils/x-state";
import {googleMapStore} from "./googleMapStore";
import {markers} from "../data/markers";

type googleMarkersType = google.maps.Marker[];
export const googleMarkersStore = store<googleMarkersType>([]);

type googleMarkersActionType = {
  getMarkers:()=>void,
}

export const googleMarkersActions = action<googleMarkersType, googleMarkersActionType>(
  ({ get, set }) => ({
    getMarkers : () => {
      const googleMap = googleMapStore.getState();
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
