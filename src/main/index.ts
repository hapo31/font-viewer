import { app, App, BrowserWindow } from "electron";

function init() {
  app.on("ready", onReady);
  app.on("activate", onActivate);
  app.on("window-all-closed", onWinodwAllClosed);
}

function onReady() {
  const window = new BrowserWindow();
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
