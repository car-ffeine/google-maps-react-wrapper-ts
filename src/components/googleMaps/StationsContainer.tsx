import GoogleMarker from "./GoogleMarker";
import {useStations} from "../../query/markerQuery";
import {useExternalValue} from "external-state";
import {googleMapStore} from "../../store/googleMapStore";

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
