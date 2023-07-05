// import {useState} from "react";
// import {markers} from "../data/markers";
import GoogleMarker from "./GoogleMarker";
import {Marker} from "../types/type";

function GoogleMarkersContainer({map, markers}:{map:google.maps.Map, markers:Marker[]}){
  // const [data,setData] = useState(markers);

  return(
    <>
        {
          Object.entries(markers).map(([key,marker])=>(
            <GoogleMarker
              key={key}
              map={map}
              marker={marker}
              onClick={()=>console.log(marker)}
            />
          ))
        }
    </>
  )
}

export default GoogleMarkersContainer;
