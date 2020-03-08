const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch").default;

const LOCAL_VERSION_PATH = path.resolve(__dirname, "client", "version.json");

const EXCALIDRAW_API = "https://excalidraw.com/version.json";

interface CheckResponse {
  local: string;
  remote: string;
  needsUpdate: boolean;
}

const _getLocalVersion = (): string => {
  const raw = fs.readFileSync(LOCAL_VERSION_PATH);
  const contents = JSON.parse(raw);
  return contents.version;
};

const _getRemoteVersion = async (): Promise<string> => {
  const raw = await fetch(EXCALIDRAW_API);
  const contents = await raw.json();
  return contents.version;
};

export default async function checkVersion(): Promise<CheckResponse> {
  const localVersion = _getLocalVersion();
  const remoteVersion = await _getRemoteVersion();

  return {
    local: localVersion,
    remote: remoteVersion,
    needsUpdate: localVersion < remoteVersion,
  };
}
