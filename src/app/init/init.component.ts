import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { TestData } from 'src/assets/test-data';
import { Student } from 'src/assets/models/student';
import { StudentRow } from '../view-models/student-row';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  statusMsg = "";
  failedLogin = "";
  disabledInput = false;

  constructor(private dataService: DataService, private router: Router, private electronService: ElectronService,
    private zone: NgZone) { }

  ngOnInit() {
    let cStatus: HTMLElement = document.getElementById('connection-status');
    let dInit: HTMLElement = document.getElementById('data-init');
    let lForm: HTMLElement = document.getElementById('login-form');
    this.electronService.ipcRenderer.send('connectToDb');
    this.electronService.ipcRenderer.on('connectionStatus', (event, arg) => {
      console.log(arg);
      //
      //test
      /* let testData: TestData = new TestData();
      let testStuds: Student[] = testData.getData();
      testStuds.forEach(stud => {
        this.dataService.addStudent(stud);
      });*/
      
//      this.electronService.ipcRenderer.send('addUser', {username: 'aki', password: '123', admin: true});
      if (arg.connected) {
          cStatus.classList.add("d-none");
          lForm.classList.remove("d-none");
      } else {
        this.zone.run( () => this.statusMsg = arg.msg);
      }
    });
    
    this.electronService.ipcRenderer.on('sendStudents', (event, studs: Student[]) => {
      studs.forEach(stud => {
        stud = this.dataService.convertDates(stud);
        this.dataService.students.push(new StudentRow(stud));
      });
      console.log(this.dataService.students);
      this.dataService.setFilters();
      this.zone.run( () => this.router.navigate(['/tabs']) );
    });

    this.electronService.ipcRenderer.on('loginResponse', (event, arg) => {
      this.zone.run( () => this.disabledInput = false);
      console.log(arg);
      if (arg.logged) {
        this.dataService.user.username = arg.user.username;
        this.dataService.user.admin = arg.user.admin;
        this.electronService.ipcRenderer.send('getStudents');
        lForm.classList.add("d-none");
        dInit.classList.remove("d-none");
      } else {
        this.failedLogin = arg.msg;
      }
    })

    this.electronService.ipcRenderer.on('newUser', (event, arg) => {
      console.log(arg);
    })

  }

  login(form: NgForm) {
    this.disabledInput = true;
    this.electronService.ipcRenderer.send('login', form.value);
    console.log(form.value);
  }
}
