import { useMarkers } from "../query/markerQuery";

function UI() {

  // react-query
  const { isFetching, ...queryInfo } = useMarkers();

  return (
    <>
      {
        queryInfo.isSuccess && (
          <div style={{ zIndex: 999, position: 'fixed', bottom: 10, right: 10, backgroundColor: 'white', padding: 10 }}>
            {queryInfo.data.length}
          </div>
        )
      }
    </>
  )
}

export default UI;
