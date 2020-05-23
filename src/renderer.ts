const rendererWindow: RendererWindow = window;

rendererWindow.ipcRenderer.receive("show-about-contents", (_, options: any) => {
  const {appName, versions, iconPath} = options;
  document.title = `About ${appName}`;

  const $titleElement = document.querySelector(".title") as HTMLHeadingElement;
  $titleElement.textContent = appName;

  const $iconElement = document.getElementById("app-icon") as HTMLImageElement;
  $iconElement.src = iconPath;

  const $appVersionElement = document.getElementById(
    "app-version",
  ) as HTMLParagraphElement;

  $appVersionElement.textContent = `Version ${versions.app.remote}`;

  const $webVersionElement = document.getElementById(
    "web-version",
  ) as HTMLParagraphElement;

  $webVersionElement.textContent = `${appName} for Web Version ${versions.web.remote}`;

  const $copyRightElement = document.querySelector(
    ".copyright",
  ) as HTMLParagraphElement;

  $copyRightElement.textContent = `Copyright (c) ${new Date().getFullYear()} ${appName}`;
});
