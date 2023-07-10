import {useExternalValue} from "external-state";
import GoogleMarker from "./GoogleMarker";
import {googleMapStore} from "../store/googleMapStore";
import {useStations} from "../query/markerQuery";

function StationsContainer() {
  const googleMap = useExternalValue(googleMapStore);

  // react-query
  const {...queryInfo} = useStations();
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

export default StationsContainer;
