# TNEvent Widgets

> A new set of widgets for the oncoming TNEvent charity event.

# Goal

* Provide a complete set of widgets for the stream event.
* Provide a way to use a single OBS Browser source to display all widgets (and update them in RT)
* Have an easy way to position/enable/configure the different widgets.
* Be reusable from one year to the other while still allowing a way to easily modify the theming of the various widgets.

> Live demo: https://fusetim.github.io/tnevent-widgets/

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## This project was created with the [Solid CLI](https://solid-cli.netlify.app) & SolidStart
