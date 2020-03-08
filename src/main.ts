import {app, BrowserWindow} from "electron";

import checkVersion from "./util/checkVersion";

const path = require("path");

const url = require("url");

const EXCALIDRAW_BUNDLE = path.join(__dirname, "client", "index.html");

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

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

    console.log("Current version: ", localVersion);
    console.log("Needs update: ", needsUpdate);
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
