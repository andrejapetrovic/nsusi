import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { DataManager } from '../src/assets/datamanager';

let win: BrowserWindow;
const { globalShortcut } = require('electron')

app.on("ready", createWindow);

app.on("activate", async () => {

  if (win === null) {
    createWindow();
  }
});

function createWindow() {

  win = new BrowserWindow({ width: 1600, height: 700 });
  win.maximize();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../../dist/inf-system/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  let datamanager: DataManager = new DataManager();
}
