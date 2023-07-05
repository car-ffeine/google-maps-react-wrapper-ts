import { store } from "external-state";

type googleMapType = google.maps.Map | undefined;
export const googleMapStore = store<googleMapType>(undefined);
