#!/usr/bin/env node

const https = require("https");
const fs = require("fs");

const dest = "excalidraw.asar";
const file = fs.createWriteStream(dest);
const request = https
  .get("https://excalidraw.com/excalidraw.asar", response => {
    response.pipe(file);
    file.on("finish", () => {
      console.info("excalidraw.asar is downloaded");
      file.close();
    });
  })
  .on("error", error => {
    fs.unlink(dest, () => {});
    console.error(error);
  });
