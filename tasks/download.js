#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("excalidraw.asar");
const request = https.get("https://excalidraw.com/excalidraw.asar", function(response) {
  response.pipe(file);
  console.info("excalidraw.asar is downloaded");
});
