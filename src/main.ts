import {app, BrowserWindow} from "electron";
import * as minimist from "minimist";

import checkVersion from "./util/checkVersion";

const path = require("path");
const url = require("url");
const EXCALIDRAW_BUNDLE = path.join(__dirname, "client", "index.html");
let mainWindow: Electron.BrowserWindow;
const argv = minimist(process.argv.slice(1));

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
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
    const {local: localVersion, needsUpdate} = await checkVersion();

    console.info("Current version", localVersion);
    console.info("Needs update", needsUpdate);
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
