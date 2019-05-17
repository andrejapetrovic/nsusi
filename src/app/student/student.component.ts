import { Component, OnInit, Input, Host } from '@angular/core';
import { DataService } from '../service/data.service';
import { Student } from 'src/assets/models/student';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentRow } from '../view-models/student-row';
import { ITab } from '../view-models/ITab';
import { TabsComponent } from '../tabs/tabs.component';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Input() studId: string;
  student: Student;
  studentRow: StudentRow;
  help; 

  constructor(private dataService: DataService, private route: ActivatedRoute,  @Host() private parent: TabsComponent,
    public searchService: SearchService) { }

  ngOnInit() {

        this.studentRow = this.dataService.getStudentRow(this.studId);
        this.student = this.studentRow.getModel();

        let rvArr = ['word', 'excel', 'internet', 'uopste'];
        this.help = {
          pozMob: this.student.mob.split(' ')[0],
          pozTel: this.student.tel.split(' ')[0],
          mob: this.student.mob.split(' ').slice(1).join(' '),
          tel: this.student.tel.split(' ').slice(1).join(' '),
          word: this.student.racVest.includes('word'),
          excel: this.student.racVest.includes('excel'),
          internet: this.student.racVest.includes('internet'),
          uopste: this.student.racVest.includes('uopste'),
          dat: this.student.dat.getDay() + ". " + this.student.dat.getMonth() + ". " + this.student.dat.getFullYear(),
          datUcl: this.student.datUcl.getDay() + ". " + this.student.datUcl.getMonth() + ". " + this.student.datUcl.getFullYear(),
          ostaleRv: this.joinArr( this.student.racVest.filter( rv => !rvArr.includes(rv) ) ),   
          jezici: this.joinArr(this.student.jezici),
          drugeVes: this.joinArr(this.student.drugeVes),
          prisSkup: this.joinArr(this.student.prisSkup)   
        }
  }

  onSubmit(form) {
    this.student.mob = this.help.pozMob + " " + this.help.mob;
    this.student.tel = this.help.pozTel + " " + this.help.tel;
    this.student.dat = this.str2Date(this.help.dat);
    this.student.datUcl = this.str2Date(this.help.datUcl);
    let rv = [];
    if (this.help.word) rv.push('word');
    if (this.help.excel) rv.push('excel');
    if (this.help.internet) rv.push('internet');
    if (this.help.uopste) rv.push('uopste');
    this.student.racVest = rv.concat(this.str2Arr(this.help.ostaleRv));
    this.student.jezici = this.str2Arr(this.help.jezici);
    this.student.drugeVes = this.str2Arr(this.help.drugeVes);
    this.student.prisSkup = this.str2Arr(this.help.prisSkup);
    console.log(this.student);
    
    let stud = this.dataService.convertDates(this.student);
    let row = new StudentRow(stud);
    let idx = this.dataService.students.indexOf(this.dataService.students.find(s => s._id === stud._id));
    this.dataService.students[idx] = row;
    this.dataService.updateStudent(this.student);
  }

  change(key, val) {
    this.student[key] = val;
  }

  private str2Date(dateStr: string): Date {
    let d = dateStr.split('. ');          
    return new Date(parseInt(d[2]), parseInt(d[1]), parseInt(d[0]));
  }
 
  private str2Arr(arrStr): any[] {
    if (!arrStr) return [];
    arrStr = arrStr.replace(/\s/g, '');
    return arrStr.includes(',') ? arrStr.split(',') : [arrStr];
  } 

  private joinArr(arr: any[]) {
    if(!arr) return [];
    return arr.length == 0 ? arr[0] : arr.join(', '); 
}

openFees() {
  let tab: ITab = {
    type: "clanarina",
    studId: this.student._id,
    name: "Članarine (" + this.student.ime + " " + this.student.prz+ ")",
    unique: true,
    id: "clanarina"+this.student._id     
  }
  this.parent.createUniqueTab(tab);
}

openSuspensions() {
  let tab: ITab = {
    type: "suspenzija",
    studId: this.student._id,
    name: "Suspenzije (" + this.student.ime + " " + this.student.prz+ ")",
    unique: true,
    id: "suspenzija"+this.student._id     
  }
  this.parent.createUniqueTab(tab);
}

archive() {
  this.dataService.students = this.dataService.students
    .filter( s => s._id !== this.studentRow._id);
  this.dataService.archive.push(this.studentRow);
  console.log(this.dataService.students);
  this.studentRow.arhiviraj();
}

vrati(){
  this.dataService.archive = this.dataService.archive
    .filter( s => s._id !== this.studentRow._id);
  this.dataService.students.push(this.studentRow);

  this.studentRow.vratiIzArhive();
  }


}
