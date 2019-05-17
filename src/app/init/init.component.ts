import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { TestData } from 'src/assets/test-data';
import { Student } from 'src/assets/models/student';
import { StudentRow } from '../view-models/student-row';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private electronService: ElectronService,
    private zone: NgZone) { }

  ngOnInit() {
    this.electronService.ipcRenderer.send('connectToDb');
    
    this.electronService.ipcRenderer.on('connectionStatus', (event, arg) => {
      console.log(arg);

      //test
     /* let testData: TestData = new TestData();
      let testStuds: Student[] = testData.getData();
      testStuds.forEach(stud => {
        this.dataService.addStudent(stud);
      });*/


      this.electronService.ipcRenderer.send('getStudents');
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

  }

  public test() {
    console.log(this.dataService.initialized);
  }
}
