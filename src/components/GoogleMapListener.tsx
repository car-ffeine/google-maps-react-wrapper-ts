import { useEffect } from "react";
import { fetchMarkers } from "../query/markerQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function GoogleMapListener({ googleMap }: { googleMap: google.maps.Map }) {

  const queryClient = useQueryClient();

  const markerMutation = useMutation({
    mutationFn: fetchMarkers,
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] });
    },
  })


  useEffect(() => {

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

  }, [])

  return (
    <></>
  )
}

export default GoogleMapListener