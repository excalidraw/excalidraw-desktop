import {ipcRenderer, contextBridge, remote} from "electron";
import {IpcListener} from "./types";

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: string, data: any[]) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: IpcListener) => {
    ipcRenderer.on(channel, (event, ...args: any[]) => func(event, ...args));
  },
});

contextBridge.exposeInMainWorld("remote", {
  getVersion: remote.app.getVersion,
});
