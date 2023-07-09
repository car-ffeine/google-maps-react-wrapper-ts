import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap";
import UI from "./components/UI";
import GoogleMarkersContainer from "./components/GoogleMarkersContainer";


const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return (
        <>
          <GoogleMap minHeight="100vh" />
          <GoogleMarkersContainer />
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
      <UI />
    </>
  );
}

export default App;
