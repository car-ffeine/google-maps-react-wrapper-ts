import {Status, Wrapper} from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap";
import UI from "./components/UI";
import StationsContainer from "./components/StationsContainer";


const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return (
        <>
          <GoogleMap
            minHeight="100vh"
            initialPosition={{
              lat: 37.5056102333107,
              lng: 127.05081496722168,
            }}
            initialZoomSize={14}
            markersContainer={(googleMap) => <StationsContainer googleMap={googleMap}/>}
          />
        </>
      );
  }
};

function App() {

  return (
    <>
      <Wrapper
        apiKey={`${process.env.REACT_APP_API_KEY}`}
        render={render}
      />
      <UI/>
    </>
  );
}

export default App;
