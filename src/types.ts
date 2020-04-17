import {IpcRendererEvent, IpcRenderer} from "electron";

export type IpcListener = (event: IpcRendererEvent, ...args: any[]) => void;
export type CustomIpcSender = (channel: string, ...args: any[]) => null;

export interface CustomIpcRenderer extends IpcRenderer {
  send: (channel: string, ...args: any[]) => null;
  receive: (channel: string, listener: IpcListener) => null;
}

declare global {
  interface RendererWindow extends Window {
    ipcRenderer?: CustomIpcRenderer;
    remote?: {
      getVersion: () => string;
    };
  }
}
