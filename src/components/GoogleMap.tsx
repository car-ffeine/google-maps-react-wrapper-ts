import {useEffect, useRef} from "react";
import {googleMapStore} from "../store/googleMapStore";
import {useExternalState} from "external-state";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchMarkers} from "../query/markerQuery";

function GoogleMapListener({googleMap}: { googleMap: google.maps.Map }) {

  const queryClient = useQueryClient();

  const markerMutation = useMutation({
    mutationFn: fetchMarkers,
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['markers']});
    },
  })

  useEffect(() => {

    googleMap.addListener("dragend", () => {
      console.log("center is changed. try to re-fetch!");
      markerMutation.mutate(); // react-query 한테 업데이트 요청하는 역할
    });

    googleMap.addListener("zoom_changed", () => {
      console.log("zoom is changed. try to re-fetch!");
      markerMutation.mutate();
    });

  }, [])

  return (
    <></>
  )
}

interface GoogleMapProps {
  minHeight: string;
  initialPosition: google.maps.LatLngLiteral;
  initialZoomSize: number;
}

function GoogleMap({minHeight, initialPosition, initialZoomSize}: GoogleMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useExternalState(googleMapStore);

  console.log('혹시 재 렌더링 되면 이게 뜰 것임')

  useEffect(() => {

    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: initialPosition,
        zoom: initialZoomSize,
        disableDefaultUI: true,
      });

      setGoogleMap(initialMap);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{minHeight: minHeight}}/>
      {googleMap && <GoogleMapListener googleMap={googleMap}/>}
    </>
  );
}

export default GoogleMap;
