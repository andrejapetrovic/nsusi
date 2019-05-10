import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    val.drVest ? val.drugeVes = this.str2Arr(val.drugeVes) : val.drVest = [];
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
    val.drugeVes = this.str2Arr(val.drugeVes);
    val.studOrgs = this.str2Arr(val.studOrgs);
    val.suspenzije = [];
    val.aktivan = true;
    val.nedostupan = false;
    val.prisSkup = [];
    let student = new Student(val);
   
    this.dataService.students.push(new StudentRow(student));
  }

  public str2Arr(arrStr: string): any[] {
    console.log(arrStr);
    if (!arrStr) return [];
    arrStr = arrStr.replace(/\s/g, '');
    return arrStr.includes(',') ? arrStr.split(',') : [arrStr];
}

public str2Date(dateStr: string): Date {
  let d = dateStr.split('. ');
  return new Date(parseInt(d[2]), parseInt(d[1]), parseInt(d[0]));
}
}
