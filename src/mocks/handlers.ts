// src/mocks/handlers.js
import { rest } from 'msw'
import { MarkersRequest } from '../types/type'
import { markers } from "../data/markers";

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

  rest.post('/getMarkers', async (req, res, ctx) => {
    const body: MarkersRequest = await req.json();
    const { lng, lat, deltaX, deltaY } = body;
    // console.log(lng, lat, deltaX, deltaY,)

    const y1 = (lat + deltaY);
    const y2 = (lat - deltaY);
    const x1 = (lng + deltaX);
    const x2 = (lng - deltaX);

    const foundMarkers = markers.filter((marker) =>
      (marker.lat < y1 && marker.lat > y2) && (marker.lng < x1 && marker.lng > x2)
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
