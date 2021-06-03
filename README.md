# Chia Log Reader and Node API

Made to work with an upcoming app that's going on the Google play store and Apple store so you can monitor plotting from your mobile device.

## How to setup

### Docker & Docker Compose

#### Prerequisites

1. Docker
2. Docker compose

##### Steps

1. Clone the directory with `git clone git@github.com:128BitStudios/swar-chia-node-api.git`
2. Make a copy of the `docker-compose.example.yml` and name it `docker-compose.yml`
3. Modify `volumes:` in `docker-compose.yml` to point at your local chia logs folder
4. Modify `ports:` if you wish in `docker-compose.yml`
5. Run `docker-compose up --build`
6. Go to `http://localhost:3000/plot/latest` to make sure it's working
7. ????
8. Profit

### Manual Install

##### Steps

1. Clone the directory with `git clone git@github.com:128BitStudios/swar-chia-node-api.git`
2. Make a copy of the `.env.example` and name it `.env`
3. Change the `CHIA_LOGS` variable to your log folder for Chia
4. Build the API using `npm ci`
5. Start the API using `npm run serve`
6. Go to `http://localhost:3000/plot/latest` to make sure it's working
7. ????
8. Profit
