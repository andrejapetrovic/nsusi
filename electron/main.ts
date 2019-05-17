import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { ipcMain } from "electron";
import { StudentService } from '../src/assets/services/student-service';

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
      pathname: path.join(__dirname, '/../../../dist/inf-system/index.html'),
      protocol: "file:",
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

}

  const fs = require('fs');
  let raw_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/database-url.txt'));
  let database_url = raw_data.toString('ascii', 0, raw_data.length);    

  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(database_url, { useNewUrlParser: true });

  ipcMain.on('connectToDb', (event, arg) => {
    client.connect( err => {
        if (err) {
          event.sender.send('connectionStatus', "Problemi prilikom konekcije na server baze")
          throw err; 
        }

        event.sender.send('connectionStatus', "Uspešno konektovan na server baze")
        console.log("Connected to database server");
        
        const db = client.db('nsusi');
       
        new StudentService(db, ipcMain);
  
    }); 
  })

