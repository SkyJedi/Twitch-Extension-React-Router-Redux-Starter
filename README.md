# Twitch Extension React Router Redux Starter

readme mostly copied from [embiem/twitch-extension-starter](https://github.com/embiem/twitch-extension-starter)

This project will get you started developing Twitch Extensions using React!

## Getting started

1. Install with yarn or npm:

`yarn` or `npm install`

2. Bundle and start development server:

`yarn start` or `npm run start`

3. It will tell you the paths to the different pages in the console, e.g. "https://localhost:8080/panel.html". Go to this address in your browser.
    
    - Note:  Testing on localhost in browser, isAuth will also return false so you will always just see loading.   You can set {isAuth : true} in `App.js` and each component to see layout, but any this.Twitch functions will not work until you are in DevRig or Twitch proper.

4. Open file in `src/components/Panel.js`, change `<h2>You're on the Panel page!</h2>` to something cool and watch it being updated live in the browser!

5. Happy hacking!

## Testing on Twitch

To test your extension on Twitch while running the development server (`yarn start` as described above), follow these steps:

1. Create your Twitch extension at [https://dev.twitch.tv](https://dev.twitch.tv)

2. Inside your extension versions, under "Asset Hosting", insert the correct values
    - `Testing Base URI` (by default: `https://localhost:8080/`)
    - `Panel Viewer Path` (default: `panel.html`)
    - `Config Path` (default: `config.html`)
    - `Live-Config Path` (default: `live_config.html`) 
    - `Video_Component Path` (default: `video_component.html`) 
    - `Video_Overlay Path` (default: `video_overlay.html`) 
    - `Mobile Path` (default: `mobile.html`) 
    
    These are the pages defined under `App.js`.

3. On the Versions -> Version Status page, click the "View on Twitch and Install" button.

4. Install your extension. You should be redirected to your config page and already see the content (default: "You're on the Live_Config page!")

5. Go back to the extensions inside your streamer dashboard, locate your extension under "Installed Extensions" and "Activate" your new extension.

6. Go to your channel and see the Viewer page of your extension integrated on Twitch! Make any changes and see them change live!!

7. Lastly go to your live streamer dashboard and see your live config page displayed in the Extensions widget!

In Short:

* Your viewer page is being displayed on your channel either as a video overlay (when your channel is live) or panel. You can choose between overlay or panel when creating the extension.

* Your config page is being displayed in your streamer's extensions dashboard, after installing the extension.

* Your live config page is being displayed in your streamer's live dashboard, after installing and activating the extension.

## Packaged ZIP

To create the ZIP, after successfully testing the extension, run "npm run package". This will create a new ZIP file in the project root named after the current version set in your package.json.

In your extension's settings under Versions -> Version Assets, upload the created ZIP file. Then your're ready to move to "Hosted Test" in the Version Status section.

## Setting Redux State

This is a very basic and simple example.  Currently it is set up to update the state when a pubsub is sent via `twitch.ext.send()` and then update redux state and also set the state to `twitch.ext.configuration`. 

As `twitch.ext.configuration` is limited to `limited to 5 KB and can be set at most 20 times per minute.` storing the entire redux state is not a viable production solution. As such it is advised to set up an EBS,

## Alternative

There's now an official developer-rig by TwitchDev, which gives you a more integrated environment. For an official solution, please go to https://github.com/twitchdev/developer-rig. You could also combine the rig with this starter code.