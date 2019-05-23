import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { StudentService } from '../src/assets/services/student-service';
import { UserService } from '../src/assets/services/user-service';
import { FeeService } from '../src/assets/services/fee-service';

let win: BrowserWindow;

app.on("ready", createWindow);

app.on("activate", async () => {

  if (win === null) {
    createWindow();
  }
});

function createWindow() {

  win = new BrowserWindow({ width: 1600, height: 700,  webPreferences: { nodeIntegration: true }});
  win.maximize();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../../../dist/inf-system/index.html'),
      protocol: "file:",
      slashes: true
    })
  );

//  win.webContents.openDevTools();

  win.on("closed", () => {
    win.removeAllListeners('close');
    win = null;
  });
  
}

  app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  const fs = require('fs');

  //MongoDB
  /*let raw_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/database-url.txt'));
  let database_url = raw_data.toString('ascii', 0, raw_data.length);    

  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(database_url, { useNewUrlParser: true });

  ipcMain.on('connectToDb', (event, arg) => {
    client.connect( err => {
        if (err) {
          event.sender.send('connectionStatus', 
            {connected: false, msg:"Problemi prilikom konekcije na server baze"});
          throw err; 
        }
        let raw_user_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/user.json'));
        let user_config = JSON.parse(raw_user_data);

        let raw_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/god.txt'));
        let god = raw_data.toString('ascii', 0, raw_data.length); 

        event.sender.send('connectionStatus', {connected: true, user: user_config, god: god})
        console.log("Connected to database server");
        
        const db = client.db('nsusi');
        new UserService(db, ipcMain);
        new StudentService(db, ipcMain);
        new FeeService(db, ipcMain);
    }); 
  })*/

  //nedb
  var Datastore = require('nedb');
  let db: any = {};
  db.users = new Datastore(path.join(__dirname, '../../../src/assets/data/users.db'));
  db.students = new Datastore(path.join(__dirname, '../../../src/assets/data/students.db'));
  db.fees = new Datastore(path.join(__dirname, '../../../src/assets/data/fees.db'));

  ipcMain.on('connectToDb', (event, arg) => {

    db.users.loadDatabase( err => {  
      if(err) throw err  
      db.students.loadDatabase( err => {
        if(err) throw err
        db.fees.loadDatabase( err => {
          if (err) throw err
          let raw_user_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/user.json'));
          let user_config = JSON.parse(raw_user_data);
  
          let raw_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/god.txt'));
          let god = raw_data.toString('ascii', 0, raw_data.length); 
  
          event.sender.send('connectionStatus', {connected: true, user: user_config, god: god})
          console.log("Connected to database server");
          new UserService(db.users, ipcMain);
          new StudentService(db.students, ipcMain);
          new FeeService(db.fees, ipcMain);
        })
      })
    });

    /*client.connect( err => {
        if (err) {
          event.sender.send('connectionStatus', 
            {connected: false, msg:"Problemi prilikom konekcije na server baze"});
          throw err; 
        }
        let raw_user_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/user.json'));
        let user_config = JSON.parse(raw_user_data);

        let raw_data = fs.readFileSync(path.join(__dirname, '../../../src/assets/config/god.txt'));
        let god = raw_data.toString('ascii', 0, raw_data.length); 

        event.sender.send('connectionStatus', {connected: true, user: user_config, god: god})
        console.log("Connected to database server");
        
        new UserService(db, ipcMain);
        new StudentService(db, ipcMain);
        new FeeService(db, ipcMain);
    }); */
  })

  ipcMain.on('saveConfig', (event, arg) => {
    var json = JSON.stringify(arg);
    fs.writeFile(path.join(__dirname, '../../../src/assets/config/user.json'), json, err => { if (err) throw err} );
  })

  ipcMain.on('saveGod', (event, arg) => {
    fs.writeFile(path.join(__dirname, '../../../src/assets/config/god.txt'), arg, err => {
      if (err) throw err;
    });
  })

