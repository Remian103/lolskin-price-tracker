# React for LoL Price Tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## preparations
1. generate ./config.json with reference to ./config.json.sample
2. generate ./public/_redirects with reference to ./public/_redirects.sample

## in Local Enviroment

### Installation

1. install [node.js LTS](https://nodejs.org/en/)
2. `npm install -g yarn`
3. `yarn install`

### Development

`yarn start` \
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits.\
You will also see any errors in the console.

### Build (Productions)

`yarn build` \
Builds the app for production to the 'build' folder. \
You can just link the 'build' folder to web server.

-------------------

## in Docker Enviroment

### Installation

1. install docker
2. (optional) `./dev-image.sh` - run after you modifying any package files.

### Development

`./dev-run.sh` \
Run docker container. \
You will get bash console of the container. \
In bash, you can run `yarn start` and `yarn build`.

### Build

...

-------------------

## Issue

When running `./dev-run.sh`, \
if you encounter error like ***groups: cannot find name for group ID***, \
please read and follow comments in Dockerfile.dev. \
After that, run `./dev-image.sh`. \
Then `./dev-run.sh` will work.
