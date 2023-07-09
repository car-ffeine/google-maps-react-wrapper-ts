import axios from "axios";
import { Marker, MarkersRequest } from "../types/type";
import { useQuery } from "@tanstack/react-query";
import { googleMapStore } from "../store/googleMapStore";

const getDisplayPosition = (map:google.maps.Map) => {
  const center = map.getCenter() as google.maps.LatLng;
  const bounds = map.getBounds() as google.maps.LatLngBounds;

  const deltaX = (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 2;
  const deltaY = (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 2;
  const centerX = center.lng();
  const centerY = center.lat();

  return {
    lng: centerX,
    lat: centerY,
    deltaX,
    deltaY
  } as MarkersRequest
}

export async function fetchMarkers(): Promise<Marker[]> {
  const map = googleMapStore.getState();
  if(map){
    const query = getDisplayPosition(map);
    const res = await axios.post('/getMarkers', query);
    return res.data;
  }
  else {
    return [];
  }
}

export function useMarkers() {
  return useQuery({ queryKey: ['markers'], queryFn: fetchMarkers })
}

