import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs/promises";
import mime from "mime";
import path from "path";

function init() {
  app.on("ready", onReady);
  app.on("activate", onActivate);
  app.on("window-all-closed", onWinodwAllClosed);
  ipcMain.handle("fetchFileList", async (event, folderPath: string) => {
    const files = await fs.readdir(folderPath);
    const results = files.map((file) =>
      mime.getType(path.join(folderPath, file))
    );
    return results
      .filter((res) => res != null && res.includes("font"))
      .map((_, i) => path.join(folderPath, files[i]));
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
