// import {useState} from "react";
import { useExternalValue } from "external-state";
import GoogleMarker from "./GoogleMarker";
import { googleMapStore } from "../store/googleMapStore";
import { useMarkers } from "../query/markerQuery";

function GoogleMarkersContainer() {
  const map = useExternalValue(googleMapStore);

  // react-query
  const { isFetching, ...queryInfo } = useMarkers();
  const markers = queryInfo.data
  console.log(`markers in component: ${markers?.length}`)

  if (!markers) {
    return (<></>)
  }

  return (
    <>
      {
        (map && queryInfo.isSuccess) && markers.map((marker) => (
          <GoogleMarker
            key={marker.id}
            map={map}
            marker={marker}
            onClick={() => console.log(marker)}
          />
        ))
      }
    </>
  )
}

export default GoogleMarkersContainer;
