import { googleMapStore } from "../store/googleMapStore";
import { useExternalValue } from "../utils/x-state";
import {useEffect} from "react";
import {markers} from "../data/markers";

function MarkerContainer() {
  const googleMap = useExternalValue(googleMapStore);


  const getMarkers = () => {
    console.log('markers!')
    markers.forEach((marker)=>{
      return new google.maps.Marker({
        position: {lat: marker.lat, lng: marker.lng},
        map: googleMap,
        title: `${marker.title}`,
      });
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
