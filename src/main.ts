import {app, BrowserWindow} from "electron";

const EXCALIDRAW_BUNDLE = `file://${__dirname}/../excalidraw-2020-02-29-10-52-11.asar/index.html`;

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.loadURL(EXCALIDRAW_BUNDLE);

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
