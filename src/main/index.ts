import { app, App, BrowserWindow } from "electron";

function init() {
  app.on("ready", onReady);
  app.on("activate", onActivate);
  app.on("window-all-closed", onWinodwAllClosed);
}

function onReady() {
  console.log("onReady");
}

function onActivate() {
  const window = new BrowserWindow();
  window.loadURL(`file://${__dirname}/index.html`);
  window.show();
}

function onWinodwAllClosed() {
  app.quit();
}

init();
