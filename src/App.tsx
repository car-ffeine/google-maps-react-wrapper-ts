import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapContainer from "./components/GoogleMapContainer";
import UI from "./components/UI";


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
    <>
      <Wrapper
        apiKey={`${process.env.REACT_APP_API_KEY}`}
        render={render}
      >
        <GoogleMapContainer minHeight="100vh" />
      </Wrapper>
      <UI />
    </>
  );
}

export default App;
