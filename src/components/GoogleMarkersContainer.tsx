// import {useState} from "react";
import { useExternalValue } from "external-state";
import GoogleMarker from "./GoogleMarker";
import { googleMapStore } from "../store/googleMapStore";
import { useMarkers } from "../query/markerQuery";

function GoogleMarkersContainer() {
  const map = useExternalValue(googleMapStore);

  // react-query
  const { isFetching, ...queryInfo } = useMarkers();
  console.log(`markers in component: ${queryInfo.data?.length}`)

  return (
    <>
      {
        (map && queryInfo.isSuccess) && Object.entries(queryInfo.data).map(([key, marker]) => (
          <GoogleMarker
            key={key}
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
