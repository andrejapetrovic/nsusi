import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Student } from '../../assets/models/student';
import { TestData } from '../../assets/test-data';
import { StudentRow } from '../view-models/student-row';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  students: StudentRow[] = [];
  mesta: string[] = [];
  pozBrFiksni: string[] = [];
  jezici: string[] = ["srpski", "engleski", "nemacki"]; 
  pozBrMob: string[] = ["060", "061", "062", "063", "064", "065", "066", "0677", "069"];
  initialized: boolean = false;

  constructor(private electronService: ElectronService) { 
  /*  let testData: TestData = new TestData();
    let testStuds: Student[] = testData.getData();
    for(let i = 0; i<1000; i++) {
      testStuds.forEach(stud => {
        this.electronService.ipcRenderer.send('addStudent', stud);
      });
    }*/
   /* this.electronService.ipcRenderer.on('newStudent', (event, arg: Student) => {
      console.log(arg);
      this.students.push(arg);
    });
    this.electronService.ipcRenderer.send('getStudents');
    this.electronService.ipcRenderer.on('sendStudents', (event, arg: Student[]) => {
*/
      //studenti
      let testData: TestData = new TestData();
      this.students = testData.getData();
      
      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      }

      function flatten(arr) {
        return ([].concat.apply([], tempJez)).filter(distinct);
      }

      // unique mesta
      this.mesta = this.students.map(stud => stud.mestoStan);
      this.mesta = this.mesta.concat(this.students.map( stud => stud.mestoRodj));
      this.mesta = this.mesta.filter(distinct);

      //jezici
      let tempJez = this.students.map(stud => stud.jezici);
      this.jezici = flatten(tempJez);

      //poz br
      this.pozBrFiksni = this.students.map(stud => stud.tel.split('-')[0]).filter(distinct);
      this.initialized = true;
   // });
  }
}
