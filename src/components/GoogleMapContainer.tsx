import { useEffect, useRef } from "react";
import { googleMapActions } from "../store/googleMapStore";
import {googleMarkersActions} from "../store/googleMarkersStore";

function GoogleMapContainer({ minHeight }: { minHeight: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialCenter = {
      lat: 37.5056102333107,
      lng: 127.05081496722168,
    };

    const initialZoomSize = 14;

    if (ref.current) {
      const googleMap = new window.google.maps.Map(ref.current, {
        center: initialCenter,
        zoom: initialZoomSize,
      });
      googleMap.addListener("dragend", () => {
        console.log("center is changed. try to re-fetch!");
        googleMarkersActions.getMarkers();
      });
      googleMap.addListener("zoom_changed", () => {
        console.log("zoom is changed. try to re-fetch!");
        googleMarkersActions.getMarkers();
      });
      googleMapActions.setMap(googleMap);
      googleMarkersActions.getMarkers();
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: minHeight, }} />
    </>
  );
}

export default GoogleMapContainer;
