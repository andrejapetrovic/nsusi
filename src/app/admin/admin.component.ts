import { Component, OnInit, NgZone, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  users = [];
  err;
  disabledInput: boolean = false;

  constructor(private electronService: ElectronService, private dataService: DataService,
    private zone: NgZone) { }

  ngOnInit() {
    
    this.electronService.ipcRenderer.send('getUsers');
    this.electronService.ipcRenderer.on('sendUsers', (error, users) => {
      this.users = users;
    })
    this.electronService.ipcRenderer.on('newUser', (error, res) => {
      this.zone.run( () => this.disabledInput = false);
      if(res.added) {
        this.zone.run( () => {
          if (res.added) {
            this.users.push(res.user)
            this.err = "";
          }
        });
      }

    })
    this.electronService.ipcRenderer.on('deleted', (error, username) => {
      this.zone.run( () => this.users = this.users.filter( user => user.username !== username) );
    })
  }

  newUser(form: NgForm) {
    let newUser = form.value;
    newUser.password = "";
    if (!form.value.admin) newUser.admin = false;

    let usernames = this.users.map(u => u.username).filter(x => x === newUser.username)
    if (usernames.length > 0) {
      this.err = "Već postoji korisnik sa tim username-om";
      return;
    }
    this.disabledInput = true;
    this.electronService.ipcRenderer.send('addUser', newUser);
  }

  deleteUser(user) {

    let admins = this.users.filter(u => u.admin);
    if(admins.length < 2 && user.admin) {
      this.err = "Nije moguće obrisati korisnika";
      return;
    }
    
    this.electronService.ipcRenderer.send('deleteUser', user.username);
  }

  close() {
    this.err = "";
  }


}
