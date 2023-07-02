import { googleMapStore } from "../store/googleMapStore";
import { useExternalValue } from "../utils/x-state";
import {useEffect} from "react";
import {markers} from "../data/markers";
import {googleMarkersActions} from "../store/googleMarkersStore";

function MarkerContainer() {
  const googleMap = useExternalValue(googleMapStore);


  useEffect(()=>{
    googleMarkersActions.getMarkers();
  },[])

  return (
    <>

    </>
  )
}

export default MarkerContainer;
