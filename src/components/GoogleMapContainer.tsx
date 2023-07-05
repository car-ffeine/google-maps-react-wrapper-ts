import { useEffect, useRef } from "react";
import { googleMapStore } from "../store/googleMapStore";
import { fetchMarkers } from "../query/markerQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function GoogleMapContainer({ minHeight }: { minHeight: string }) {
  const ref = useRef<HTMLDivElement>(null);

  console.log('혹시 재 렌더링 되면 이게 뜰 것임')
  const queryClient = useQueryClient();


  const markerMutation = useMutation({
    mutationFn: fetchMarkers,
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] });
    },
  })

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
        console.log("center is changed. try to re-fetch!");
        markerMutation.mutate();
      });
      googleMap.addListener("zoom_changed", () => {
        console.log("zoom is changed. try to re-fetch!");
        markerMutation.mutate();
      });

      /**
       * 최초 1회 바운드 값 설정 이후에 마커를 요청한다. 이후에 스스로 제거 처리됨
       */
      const initMarkersEvent = googleMap.addListener('bounds_changed', () => {
        console.log("==========bounds are changed. try to fetch!==========");
        markerMutation.mutate();
        google.maps.event.removeListener(initMarkersEvent)
      })

      googleMapStore.setState(googleMap);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: minHeight, }} />
    </>
  );
}

export default GoogleMapContainer;
