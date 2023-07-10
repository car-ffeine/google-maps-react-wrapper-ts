import {Station} from "../types/type";

export const markers: Station[] = Array.from({length: 3000}).map((_, i) =>
  ({
    id: i,
    lat: 37 + (Math.random() * 9999) * 0.0001,
    lng: 127 + (Math.random() * 9999) * 0.0001,
    title: `yay ${i}`
  }))
