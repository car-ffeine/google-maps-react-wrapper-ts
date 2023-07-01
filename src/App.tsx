import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

function MyMapComponent({ minHeight }: { minHeight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

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
      });
      setMap(googleMap);
    }
  }, []);

  return <div ref={ref} id="map" style={{ minHeight: minHeight, }} />;
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <></>;
  }
};

function App() {

  return (
    <Wrapper apiKey={`${process.env.REACT_APP_API_KEY}`} render={render} >
      <MyMapComponent minHeight="100vh" />
    </Wrapper>
  );
}

export default App;
