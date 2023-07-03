import { store } from "../utils/x-state";

type googleMapType = google.maps.Map | undefined;
export const googleMapStore = store<googleMapType>(undefined);
export const googleMapActions = {
  setMap: (newMap: google.maps.Map) => {
    googleMapStore.setState(newMap);
  },

};
