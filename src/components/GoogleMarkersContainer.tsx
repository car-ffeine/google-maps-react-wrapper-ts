import { useExternalValue } from "external-state";
import GoogleMarker from "./GoogleMarker";
import { googleMapStore } from "../store/googleMapStore";
import { useMarkers } from "../query/markerQuery";

function GoogleMarkersContainer() {
  const googleMap = useExternalValue(googleMapStore);

  // react-query
  const { ...queryInfo } = useMarkers();
  const markers = queryInfo.data
  console.log(`markers in component: ${markers?.length}`)

  if (!markers || !googleMap || !queryInfo.isSuccess) {
    return <></>
  }

  return (
    <>
      {
        markers.map((marker) => (
          <GoogleMarker
            key={marker.id}
            map={googleMap}
            marker={marker}
            onClick={() => console.log(marker)}
          />
        ))
      }
    </>
  )
}

export default GoogleMarkersContainer;
