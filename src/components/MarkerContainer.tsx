import { googleMapStore } from "../store/googleMapStore";
import { useExternalValue } from "../utils/x-state";

function MarkerContainer() {
  const googleMap = useExternalValue(googleMapStore);

  return (
    <>
    </>
  )
}

export default MarkerContainer;
