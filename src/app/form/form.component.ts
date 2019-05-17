import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { SearchService } from '../service/search.service';
import { NgForm } from '@angular/forms';
import { Student } from 'src/assets/models/student';
import { StudentRow } from '../view-models/student-row';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public searchService: SearchService, public dataService: DataService) { }

  ngOnInit() {    
  
  }

  toggleOptions(event, elementId) {
    let checked: boolean = event.target.checked;
    let options: HTMLElement = document.getElementById(elementId);
    if (checked) {
      options.classList.remove("d-none");
    } else {
      options.classList.add("d-none");
    }
  }

  onSubmit(form: NgForm) {
    let val = form.value;

    val.jez ? val.jezici = this.str2Arr(val.jezici) : val.jezici = []; 
    val.drVest ? val.drugeVes = this.str2Arr(val.drugeVes) : val.drugeVes = [];
    delete val.jez;
    delete val.drVest;
    val.mob = val.pozBrMob + " " + val.mob;
    val.tel = val.pozBrFik + " " + val.tel;
    delete val.pozBrMob;
    delete val.pozBrFik;
    if(val.racunarskeVestine) {
      val.racVest = this.str2Arr(val.racVest);
      if (val.word) {
        val.racVest.push("Word")
      }
      if (val.excel) {
        val.racVest.push("Excel")
      }
      if (val.internet) {
        val.racVest.push("Internet")
      }
      if (val.uopste) {
        val.racVest.push("Uopšte")
      }
    }
    else val.racVest = [];
    delete val.word;
    delete val.excel;
    delete val.internet;
    delete val.racunarskeVestine; 
    delete val.uopste;
    val.dat = this.str2Date(val.dat);
    val.datUcl = this.str2Date(val.datUcl);
    val.studInfo = {
      fakultet: val.fakultet, smer: val.smer, godStud: val.godStud, godUpis: val.godUpis
    }
    delete val.fakultet;
    delete val.smer;
    delete val.godStud;
    delete val.godUpis;
    val.studOrgs = this.str2Arr(val.studOrgs);
    val.suspenzije = [];
    val.aktivan = true;
    if(!val.pisanjeProj) val.pisanjeProj = false;
    if(!val.radVes) val.radVes = false;
    //val.nedostupan = false;
    val.prisSkup = [];
    let student = new Student(val);
    student.clanarine = [];
    let clanarina = this.dataService.clanarine.filter( cln => cln.god === this.dataService.godClanarine) ;
    student.clanarine.push(clanarina[0]);
    val.arhiviran = false;
    console.log(student);
    this.dataService.addStudent(student);
  }

  private str2Arr(arrStr: string): any[] {
    console.log(arrStr);
    if (!arrStr) return [];
    arrStr = arrStr.replace(/\s/g, '');
    return arrStr.includes(',') ? arrStr.split(',') : [arrStr];
}

private str2Date(dateStr: string): Date {
  let d = dateStr.split('. ');
  return new Date(parseInt(d[2]), parseInt(d[1]), parseInt(d[0]));
}
}
