# Ionic Nice Calendar

Web app for Nice Calendar, built with Ionic, for the purpose of converting into mobile apps using Capacitor.

## Commands

### npm run dev

Runs dev server so you can load the app in your browser at http://localhost:8100. Develop the app and your changes autoupdate in the browser window.

### npm run build

Bundles the js, css, html, and assets from `src/` and `public/` into the `build/` directory, as part of the release process.

### npx cap sync

Takes the bundled web app in `build/` and updates the platform-specific apps in their directories, e.g. `android/`. The native app inside `android/` can be opened in Android Studio, for example. That is also the native app that would be uploaded to a given platform's app store.

### npx cap open android

Opens the project in Android Studio. You could also open the project (in the `android/` folder) directly from within Android Studio, instead of using this command.

### npx cap run android

Runs the project on a device or in an emulator. You could also run the project directly from within Android Studio, instead of using this command.
