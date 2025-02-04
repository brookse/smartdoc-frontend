Backend
- Located in [github](https://github.com/brookse/smartdoc-backend)
- Make sure it's running locally on `localhost:8080` with `npm run start`

Frontend
- Run with `npm run dev`
- Navigate to [http://localhost:3000](http://localhost:3000)

Current limitations/acknowledgements
- Only accepts 5-digit zipcodes, so largely limited to the USA
- Current time only updates when another element rerenders; does not keep up with time IRL
- Lat/lng for the list isn't super useful; would be nice to show an actual location name