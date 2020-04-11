import * as Store from "electron-store";

let metadataStore: Store;

if (!metadataStore) {
  metadataStore = new Store({});
}

export const getMetadata = (key: string): Store => {
  return metadataStore.get(`metadata.${key}`);
};

export const setMetadata = (key: string, value: any) => {
  return metadataStore.set(`metadata.${key}`, value);
};

export const setAppName = (value: string) => {
  return metadataStore.set(`metadata.appName`, value);
};

export const getAppName = () => {
  return metadataStore.get(`metadata.appName`);
};

export const getAppVersions = () => {
  const versions = metadataStore.get(`metadata.versions`);
  const {
    local: localVersion,
    remote: remoteVersion,
    needsUpdate,
    appVersion,
  } = versions;

  return {
    needsUpdate,
    app: {
      local: "",
      remote: appVersion,
    },
    web: {
      local: localVersion,
      remote: remoteVersion,
    },
  };
};
