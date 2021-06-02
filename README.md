# Chia Log Reader and Node API

Made to work with an upcoming app that's going on the Google play store and Apple store so you can monitor plotting from your mobile device.

## How to setup

1. Clone the directory with `git clone git@github.com:128BitStudios/swar-chia-node-api.git`
2. Make a copy of the `.env.example` and name it `.env`
3. Change the `CHIA_LOGS` variable to your log folder for Chia
4. Build the API using `npm ci`
5. Start the API using `npm run serve`
6. Go to `http://localhost:3000/plot/latest` to make sure it's working
