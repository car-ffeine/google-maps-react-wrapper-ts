import { useEffect, useRef } from "react";
import { googleMapStore } from "../store/googleMapStore";
import {useExternalState, useExternalValue} from "external-state";
import GoogleMapListener from "./GoogleMapListener";

function GoogleMapContainer({ minHeight }: { minHeight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap,setGoogleMap] = useExternalState(googleMapStore);

  console.log('혹시 재 렌더링 되면 이게 뜰 것임')

  useEffect(() => {
    const initialCenter = {
      lat: 37.5056102333107,
      lng: 127.05081496722168,
    };

    const initialZoomSize = 14;

    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: initialCenter,
        zoom: initialZoomSize,
        disableDefaultUI: true,
      });

      setGoogleMap(initialMap);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: minHeight, }} />
      {googleMap && <GoogleMapListener googleMap={googleMap} />}
    </>
  );
}

export default GoogleMapContainer;
