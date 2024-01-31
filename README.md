# Finnhub Websocket
## React + TypeScript + Vite

PWA for tracking stock prices

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

## Introduction
This PWA shows stock data in real time using Finnhub Stock APIs
The app has 4 components:
- A form with 2 fields, a dropdown to select a stock to watch, an input for price alert and Add Stock button
- Top cards (similar to Finnhub home), that shows the stock name, the value and the margin change as a percentage. Cards are red if the value is below the alert value and green if above.
- A graph plotting the value of all stock added in dollar value and updated in realtime.
- A list of added stocks and their corresponding alert prices

The app manage the websocket connection in background and save the values in local storage to display all the data when openning the PWA

## Installation


```bash
# Clone the repository
git clone https://github.com/Alcapone-Fx/finnhub-websocket.git

# Navigate to the project directory
cd finnhub-websocket

# Install dependencies
npm install
```
## Usage
The app uses the Finnhub API KEY, make sure to create your API KEY and add it in .env file, see .env-example

```bash
# Run local development
# App is available in http://localhost:5173/
npm run dev

# Build the project, generates manifest, service worker and registers the sw
npm run build

# The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173.
npm run preview
```

