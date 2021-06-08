# Ionic Nice Calendar

Web app for Nice Calendar, built with Ionic, for the purpose of converting into mobile apps using Capacitor.

## Commands

### npm run dev

Runs dev server so you can load the app in your browser at http://localhost:8100. Develop the app and your changes autoupdate in the browser window.

### npm run build

Bundles the js, css, html, and assets from `src/` and `public/` into the `build/` directory, as part of the release process.

### npx cap sync

Takes the bundled web app in `build/` and updates the platform-specific apps in their directories, e.g. `android/`. The native app inside `android/` can be opened in Android Studio, for example. That is also the native app that would be uploaded to a given platform's app store.
