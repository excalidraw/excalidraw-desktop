const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const isWindows = process.platform === "win32";
const electronBinary = isWindows ? "electron.cmd" : "electron";
const electronPath = path.join(rootDir, "node_modules", ".bin", electronBinary);

describe("Application launch", function () {
  this.timeout(20000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      cwd: process.cwd(),
      args: [rootDir],
      env: {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true,
        NODE_ENV: "test",
      },
      startTimeout: 10000,
      waitTimeout: 10e3,
      chromeDriverLogPath: "./chromedriver.log",
    });

    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
    });
  });
});
