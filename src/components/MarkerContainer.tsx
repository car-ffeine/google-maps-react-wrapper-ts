import { googleMapStore } from "../store/googleMapStore";
import { useExternalValue } from "../utils/x-state";
import {useEffect} from "react";
import {markers} from "../data/markers";

function MarkerContainer() {
  const googleMap = useExternalValue(googleMapStore);


  const getMarkers = () => {
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


  useEffect(()=>{
    getMarkers();
  },[])

  return (
    <>

    </>
  )
}

export default MarkerContainer;
