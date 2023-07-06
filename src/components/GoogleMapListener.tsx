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

export default GoogleMapListener
