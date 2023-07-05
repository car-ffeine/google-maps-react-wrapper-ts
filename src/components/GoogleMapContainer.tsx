import { useEffect, useRef } from "react";
import {googleMapActions, googleMapStore} from "../store/googleMapStore";
import GoogleMarkersContainer from "./GoogleMarkersContainer";
import {useExternalValue} from "external-state";
import {googleMarkersAction} from "../store/googleMarkersStore";

function GoogleMapContainer({ minHeight }: { minHeight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const map = useExternalValue(googleMapStore);

  console.log('혹시 재 렌더링 되면 이게 뜰 것임')

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

      googleMap.addListener("dragend", () => {
        console.log("center is changed. try to re-fetch!!");
        googleMarkersAction.getMarkers();
      });
      googleMap.addListener("zoom_changed", () => {
        console.log("zoom is changed. try to re-fetch!!");
        googleMarkersAction.getMarkers();
      });

      /**
       * 최초 1회 바운드 값 설정 이후에 마커를 요청한다. 이후에 스스로 제거 처리됨
       */
      const initMarkersEvent = googleMap.addListener('bounds_changed', () => {
        console.log("==========bounds are changed. try to fetch!==========");
        googleMarkersAction.getMarkers();
        google.maps.event.removeListener(initMarkersEvent)
      })

      googleMapActions.setMap(googleMap);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: minHeight, }} />
      {map && <GoogleMarkersContainer map={map} markers={[]}/>}
    </>
  );
}

export default GoogleMapContainer;
