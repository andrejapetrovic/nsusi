import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { TestData } from 'src/assets/test-data';
import { Student } from 'src/assets/models/student';
import { StudentRow } from '../view-models/student-row';
import { NgForm } from '@angular/forms';
import { StudentTableComponent } from '../student-table/student-table.component';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  statusMsg = "";
  failedLogin = "";
  disabledInput = false;
  user = {username: "", remember: false}

  constructor(private dataService: DataService, private router: Router, private electronService: ElectronService,
    private zone: NgZone, private el: ElementRef) { }

  ngOnInit() {
    let cStatus: HTMLElement = document.getElementById('connection-status');
    let dInit: HTMLElement = document.getElementById('data-init');
    let lForm: HTMLElement = document.getElementById('login-form');

    this.electronService.ipcRenderer.send('connectToDb');
    
    this.electronService.ipcRenderer.on('connectionStatus', (event, arg) => {

      if (arg.connected) {
          cStatus.classList.add("d-none");
          lForm.classList.remove("d-none");
          this.zone.run( () => {
            if(arg.user.remember) {
              this.user = arg.user;
            }
          })
          this.dataService.godClanarine = arg.god;
      } else {
        this.zone.run( () => this.statusMsg = arg.msg);
      }
    });
    
    this.electronService.ipcRenderer.send('getFees');
    this.electronService.ipcRenderer.on('sendFees', (error, fees) => {
      this.dataService.clanarine = fees;
      this.electronService.ipcRenderer.send('getStudents');
    });

    this.electronService.ipcRenderer.on('sendStudents', (event, studs: Student[]) => {
      studs.forEach(stud => {
        stud = this.dataService.convertDates(stud);
        let row = new StudentRow(stud);
        row.setClanarineZaGod(this.dataService.godClanarine);
        if ( stud.stari || stud.nedostupan ){
          this.dataService.archive.push(row);
        } else {
          this.dataService.students.push(row);
        }
      });
      this.dataService.setFilters();
      this.zone.run( () => this.router.navigate(['/tabs']) );
    });

    this.electronService.ipcRenderer.on('loginResponse', (event, arg) => {
      this.zone.run( () => this.disabledInput = false);
      if (arg.logged) {
        this.dataService.user.username = arg.user.username;
        this.dataService.user.admin = arg.user.admin;
        this.electronService.ipcRenderer.send('getFees');
        lForm.classList.add("d-none");
        dInit.classList.remove("d-none");
      } else {
        this.failedLogin = arg.msg;
      }
    })

  }

  login(form: NgForm) {
    this.disabledInput = true;
    this.electronService.ipcRenderer.send('login', form.value);
    this.electronService.ipcRenderer.send('saveConfig', {username: form.value.username, remember: form.value.remember})
    console.log(form.value);
  }
}
