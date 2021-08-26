import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs/promises";
import filetype from "file-type";
import path from "path";

const acceptMime = [
  "application/font-woff",
  "application/x-font-ttf",
  "application/x-font-otf",
];

function init() {
  app.on("ready", onReady);
  app.on("activate", onActivate);
  app.on("window-all-closed", onWinodwAllClosed);
  ipcMain.handle("fetchFileList", async (event, folderPath: string) => {
    const files = await fs.readdir(folderPath);
    const results = await Promise.all(
      files.map((file) => filetype.fromFile(file))
    );
    return results
      .filter((res) => res != null && acceptMime.includes(res.mime))
      .map((_, i) => files[i]);
  });
}

function onReady() {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "scripts", "preload.js"),
    },
  });
  window.loadFile("index.html");
  window.webContents.openDevTools();
}

function onActivate() {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.show();
  });
}

function onWinodwAllClosed() {
  app.quit();
}

init();
