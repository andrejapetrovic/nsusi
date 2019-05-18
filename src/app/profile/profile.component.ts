import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isCollapsed = false;
  disabledInput = false;
  errMsg = "";
  user;
  users = [];
  constructor(private dataService: DataService, private electronService: ElectronService,
  private zone: NgZone) { }


  ngOnInit() {
    this.user = this.dataService.user;
    if (this.user.admin)
      this.users = this.dataService.users;
    this.electronService.ipcRenderer.on('passwordUpdate', (event, arg) => {
      console.log(arg);
    })
  }

  passChange(form: NgForm) {
    let user = Object.assign({}, this.dataService.user);
    let arg = {user: user, pass: form.value};
    this.electronService.ipcRenderer.send('changePassword', arg)
  }

}
