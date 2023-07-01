import { action, store } from "../utils/x-state";
type googleMapType = google.maps.Map | undefined
export const googleMapStore = store<googleMapType>(undefined);
type googleMapActionType = {
  setMap: (newMap: google.maps.Map) => void
}
export const googleMapActions = action<googleMapType, googleMapActionType>(
  ({ get, set }) => ({
    setMap: (newMap: google.maps.Map) => {
      set(googleMapStore, newMap);
    },
  })
);

