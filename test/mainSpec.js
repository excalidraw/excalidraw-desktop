const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron");
const path = require("path");

describe("Application launch", function () {
  this.timeout(20000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      host: "127.0.0.1",
      startTimeout: 10000,
      args: [path.join(__dirname, "..", "dist", "main.bundle.js")],
      requireName: "unused",
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
