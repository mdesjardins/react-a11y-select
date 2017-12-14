## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

- Running `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.

## Coding conventions

- Basically "don't make any ESLint errors"

- CSS follows BEM conventions for now - I didn't want to use a CSS preprocessor and potentially make unreadable/overrideable CSS like CSS modules can.

- Specs for all the things.

- Follow the ARIA rules: https://w3c.github.io/using-aria/ https://www.w3.org/TR/wai-aria-practices/#menubutton etc.