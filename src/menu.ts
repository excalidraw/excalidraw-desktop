import {BrowserWindow, Menu, MenuItem} from "electron";
import * as path from "path";
import * as url from "url";
import {APP_NAME} from "./constants";
import {getAppVersions, getAppName, getMetadata} from "./util/metadata";

const ABOUT_PAGE_PATH = path.resolve(__dirname, "pages", "about.html");

const openAboutWindow = (activeWindow: BrowserWindow) => {
  let aboutWindow = new BrowserWindow({
    parent: activeWindow,
    height: 320,
    width: 320,
    modal: true,
    backgroundColor: "white",
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  aboutWindow.loadURL(
    url.format({
      pathname: ABOUT_PAGE_PATH,
      protocol: "file",
      slashes: true,
    }),
  );

  aboutWindow.setMenuBarVisibility(false);
  aboutWindow.center();
  aboutWindow.on("ready-to-show", () => aboutWindow.show());
  aboutWindow.on("show", () => {
    const aboutContent = {
      appName: getAppName(),
      iconPath: getMetadata("appIconPath"),
      versions: getAppVersions(),
    };

    aboutWindow.webContents.send("show-about-contents", aboutContent);
  });
};
export const setupMenu = (activeWindow: BrowserWindow, options = {}) => {
  const defaultMenuItems: MenuItem[] = Menu.getApplicationMenu().items;
  const menuTemplate = [
    {
      label: APP_NAME,
      submenu: [
        {
          label: `About ${APP_NAME}`,
          enabled: true,
          click: () => openAboutWindow(activeWindow),
        },
      ],
    },
  ];

  // TODO: Remove default menu items that aren't relevant
  const appMenu = Menu.buildFromTemplate(menuTemplate);
  defaultMenuItems.forEach((defaultItem) => appMenu.append(defaultItem));

  Menu.setApplicationMenu(appMenu);
};
