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
  successMsg = "";
  user;
  
  constructor(private dataService: DataService, private electronService: ElectronService,
  private zone: NgZone) { }


  ngOnInit() {
    this.user = this.dataService.user;
    this.electronService.ipcRenderer.on('passwordUpdate', (error, arg) => {
      this.zone.run( () => {
        this.disabledInput = false;
        if(!arg.updated) {
          this.successMsg = "";
          this.errMsg = "Netačan unos trenutne lozinke, neuspela promena ";
        } else {
          this.errMsg = "";
          this.successMsg = "Uspešno promenjena lozinka";
        }
        setInterval( () => {
          this.successMsg ="";
          this.errMsg = "";
          }, 10000);
      })
    })
  }

  passChange(form: NgForm) {
    let user = Object.assign({}, this.dataService.user);
    let arg = {user: user, pass: form.value}
 
    this.electronService.ipcRenderer.send('changePassword', arg);
    this.disabledInput = true;
  }

}
