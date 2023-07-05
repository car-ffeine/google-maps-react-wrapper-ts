import { useEffect } from "react";
import { Marker } from "../types/type";

function GoogleMarker({ map, marker, onClick }: { map: google.maps.Map, marker: Marker, onClick: () => void }) {

  useEffect(() => {
    console.log("marker is mounted");
    const newMarker = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      map: map,
      title: `${marker.title}`,
    });

    newMarker.addListener('click', onClick);
    return () => {
      console.log("marker is unmounted");
      newMarker.setMap(null);
    }
  }, []);

  return (
    <>
    </>
  )
}

export default GoogleMarker;
