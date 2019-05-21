import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { SearchService } from '../service/search.service';
import { NgForm } from '@angular/forms';
import { Student } from 'src/assets/models/student';
import { StudentRow } from '../view-models/student-row';
import { ValidationService } from '../service/validation.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  err;
  success;

  constructor(public searchService: SearchService, public dataService: DataService, private validate: ValidationService) { }

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
    this.err = "";
    this.success ="";
    let val = form.value;

    val.jez ? val.jezici = this.str2Arr(val.jezici) : val.jezici = []; 
    val.drVest ? val.drugeVes = this.str2Arr(val.drugeVes) : val.drugeVes = [];
    delete val.jez;
    delete val.drVest;
    val.mob = val.pozBrMob + " " + val.mob;
    val.tel = val.pozBrFik + " " + val.tel;

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

    let row = new StudentRow(student);

    let validate = this.validate.validForm(row);

    if (!validate.valid) {
      this.err = validate.status;
      return;
    }
    if(!val.pozBrMob) {
      this.err = "polje pozivni broj ne sme biti prazno";
      return;
    }
    delete val.pozBrMob;
    delete val.pozBrFik;

    let datValidation = this.validate.validateDate(row.dat);
    let datUclValidation = this.validate.validateDate(row.datUcl);
    
    if(!datValidation.valid) {
      this.err = datValidation.msg;
      return;
    }
   
    if(!datUclValidation.valid) {
      this.err = datUclValidation.msg;
      return;
    }

    let godUpisValidation = this.validate.validateSkGod(row.godUpis);
    let godUclValidation = this.validate.validateSkGod(row.godUcl);

    if(!godUclValidation.valid) {
      this.err = godUclValidation.msg;
      return;
    }
   
    if(!godUpisValidation.valid) {
      this.err = godUpisValidation.msg;
      return;
    }


    student.clanarine = [];
    if (this.dataService.clanarine.length > 0) {
      let clanarina = this.dataService.clanarine[this.dataService.clanarine.length - 1];
      student.clanarine.push(clanarina);
    }
    val.stari = false;
    val.nedostupan = false;

    this.dataService.addStudent(student);
    this.success = "Student uspešno dodat";
  }

  public str2Arr(arrStr: string): any[] {

    if (!arrStr) return [];
    arrStr = arrStr.replace(/\s/g, '');
    return arrStr.includes(',') ? arrStr.split(',') : [arrStr];
}

public str2Date(dateStr: string): Date {
  let d = dateStr.split('. ');
  return new Date(parseInt(d[2]), parseInt(d[1])-1, parseInt(d[0]));
}

clearForm(form: NgForm) {
  this.err = "";
  this.success ="";
  form.resetForm();
}

close() {
  this.err = "";
  this.success = "";
}

}
