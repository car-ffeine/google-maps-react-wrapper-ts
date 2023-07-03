import { useEffect, useRef } from "react";
import { googleMapActions } from "../store/googleMapStore";

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
        disableDefaultUI: true,
      });
      googleMapActions.setMap(googleMap);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: minHeight, }} />
    </>
  );
}

export default GoogleMapContainer;
