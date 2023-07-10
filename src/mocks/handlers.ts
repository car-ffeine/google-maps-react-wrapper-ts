// src/mocks/handlers.js
import {rest} from 'msw'
import {StationsRequest} from '../types/type'
import {markers} from "../data/markers";

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),

  rest.post('/getStations', async (req, res, ctx) => {
    const body: StationsRequest = await req.json();
    const {longitude, latitude, longitudeDelta, latitudeDelta} = body;
    // console.log(lng, lat, deltaX, deltaY,)

    const y1 = (latitude + latitudeDelta);
    const y2 = (latitude - latitudeDelta);
    const x1 = (longitude + longitudeDelta);
    const x2 = (longitude - longitudeDelta);

    const foundMarkers = markers.filter((marker) =>
      (marker.latitude < y1 && marker.latitude > y2) && (marker.longitude < x1 && marker.longitude > x2)
    )
    console.log(foundMarkers.length)
    // console.log(x1, x2, y1, y2)
    return res(
      // Respond with a 200 status code
      ctx.delay(200),
      ctx.status(200),
      ctx.json(foundMarkers)
    )
  }),
]
