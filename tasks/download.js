#!/usr/bin/env node

const https = require("https");
const fs = require("fs");

const DEST = "dist/excalidraw.asar";
const SOURCE = "https://excalidraw.com/excalidraw.asar";

const file = fs.createWriteStream(DEST);
const request = https
  .get(SOURCE, response => {
    response.pipe(file);
    file.on("finish", () => {
      console.info(`${DEST} is downloaded`);
      file.close();
    });
  })
  .on("error", error => {
    fs.unlink(DEST, () => {});
    console.error(error);
  });
