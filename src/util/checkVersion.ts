import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import {EXCALIDRAW_API, EXCALIDRAW_GITHUB_PACKAGE_JSON_URL} from "../constants";

const LOCAL_VERSION_PATH = path.resolve(__dirname, "client", "version.json");

interface CheckResponse {
  local: string;
  remote: string;
  appVersion: string;
  needsUpdate: boolean;
}

const _getLocalVersion = (): string => {
  const raw = fs.readFileSync(LOCAL_VERSION_PATH).toString();
  const contents = JSON.parse(raw);
  return contents.version;
};

const _getRemoteVersion = async (): Promise<string> => {
  const raw = await fetch(EXCALIDRAW_API);
  const contents = await raw.json();
  return contents.version;
};

const _getRemoteDesktopAppVersion = async (): Promise<string> => {
  const raw = await fetch(EXCALIDRAW_GITHUB_PACKAGE_JSON_URL);
  const contents = await raw.json();
  return contents.version;
};

export default async function checkVersion(): Promise<CheckResponse> {
  const localVersion = _getLocalVersion();
  const remoteVersion = await _getRemoteVersion();
  const appVersion = await _getRemoteDesktopAppVersion();

  return {
    local: localVersion,
    remote: remoteVersion,
    appVersion,
    needsUpdate: localVersion < remoteVersion,
  };
}
