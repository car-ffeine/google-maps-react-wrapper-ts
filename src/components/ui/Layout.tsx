import {useStations} from "../../query/markerQuery";

function Layout() {

  // react-query
  const {isFetching, ...queryInfo} = useStations();

  if (isFetching) {
    return (
      <div style={{zIndex: 999, position: 'fixed', bottom: 10, right: 10, backgroundColor: 'white', padding: 10}}>
        ⌛
      </div>
    )
  }

  return (
    <>
      {
        queryInfo.isSuccess && (
          <div style={{zIndex: 999, position: 'fixed', bottom: 10, right: 10, backgroundColor: 'white', padding: 10}}>
            {queryInfo.data.length}
          </div>
        )
      }
    </>
  )
}

export default Layout;
