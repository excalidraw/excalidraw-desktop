import {app, BrowserWindow} from "electron";
import * as minimist from "minimist";
import * as path from "path";
import * as url from "url";
import {setupMenu} from "./menu";
import checkVersion from "./util/checkVersion";
import {setMetadata, setAppName} from "./util/metadata";
import {APP_NAME} from "./constants";

let mainWindow: Electron.BrowserWindow;
const argv = minimist(process.argv.slice(1));
const EXCALIDRAW_BUNDLE = path.join(__dirname, "client", "index.html");
const APP_ICON_PATH = path.join(__dirname, "client", "logo-180x180.png");

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      preload: `${__dirname}/preload.js`,
    },
  });

  if (argv.devtools) {
    mainWindow.webContents.openDevTools({mode: "detach"});
  }

  mainWindow.loadURL(
    url.format({
      pathname: EXCALIDRAW_BUNDLE,
      protocol: "file",
      slashes: true,
    }),
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("show", async () => {
    const versions = await checkVersion();

    console.info("Current version", versions.local);
    console.info("Needs update", versions.needsUpdate);

    setAppName(APP_NAME);
    setMetadata("versions", versions);
    setMetadata("appIconPath", APP_ICON_PATH);
    setupMenu(mainWindow);
  });

  // calling.show after this event, ensure there's no visual flash
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
