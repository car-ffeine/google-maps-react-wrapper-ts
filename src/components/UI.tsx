import { googleMarkersStore } from "../store/googleMarkersStore";
import {useExternalValue} from "external-state";

function UI() {
  const markers = useExternalValue(googleMarkersStore);

  return (
    <div style={{ zIndex: 999, position: 'fixed', bottom: 10, right: 10, backgroundColor: 'white', padding: 10 }}>
      {markers.length}
    </div>
  )
}

export default UI;
