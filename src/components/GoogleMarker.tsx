import {useEffect} from "react";
import {Station} from "../types/type";

function GoogleMarker({map, marker, onClick}: { map: google.maps.Map, marker: Station, onClick: () => void }) {

  useEffect(() => {
    console.log("✅✅ marker is mounted ✅✅");
    const newMarker = new google.maps.Marker({
      position: {lat: marker.lat, lng: marker.lng},
      map: map,
      title: `${marker.title}`,
    });

    newMarker.addListener('click', onClick);

    return () => {
      newMarker.setMap(null);
      console.log("❌❌ marker is UNMOUNTED ❌❌");
    }
  }, []);

  return (
    <>
    </>
  )
}

export default GoogleMarker;
