import {app, BrowserWindow} from "electron";

const path = require("path");

const url = require("url");

const EXCALIDRAW_BUNDLE = path.join(__dirname, "excalidraw.asar", "index.html");

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
