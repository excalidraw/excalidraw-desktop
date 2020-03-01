#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const asar = require("asar");

const DEST = "dist/excalidraw.asar";
const SOURCE = "https://excalidraw.com/excalidraw.asar";
const UNPACK = "dist/client";

const file = fs.createWriteStream(DEST);
const request = https
  .get(SOURCE, response => {
    response.pipe(file);
    file.on("finish", async () => {
      console.info(`${DEST} is downloaded`);

      // unpack
      await asar.extractAll(DEST, UNPACK);

      file.close();
    });
  })
  .on("error", error => {
    fs.unlink(DEST, () => {});
    console.error(error);
  });
