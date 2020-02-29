#!/usr/bin/env node

const https = require("https");
const fs = require("fs");

const DEST = "excalidraw.asar";
const URL = "https://excalidraw.com/excalidraw.asar";

const file = fs.createWriteStream(DEST);
const request = https
  .get(URL, response => {
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
