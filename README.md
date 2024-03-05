Hello and welcome to our e2e workshop!

# Prerequisites
[Install docker](https://docs.docker.com/engine/install/)

[Install docker compose plugin](https://docs.docker.com/compose/install/linux/) if it not already installed

git clone git@github.com:vrozaev/datalens-ui.git e2e-workshop

cd e2e-workshop && git checkout e2e-workshop

# Start backend & database:
docker compose -f tests/docker-compose.e2e.yml -f tests/docker-compose.e2e-dev.yml up

# Start ui in dev mode:
npm ci # Use next command on Apple M1: npm ci --target_arch=x64
npm run dev

# Run tests:
npm run test:install:chromium
npm run test:workshop
npm run test:workshop:ui