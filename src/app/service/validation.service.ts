import { Injectable } from '@angular/core';
import { StudentRow } from '../view-models/student-row';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateDate(date) {
    let d = date.split('. ');
    let datum = new Date(d[2], d[1]-1, d[0]);
    if(isNaN(datum.getTime())) {
      return {valid: false, msg: "Nevalidan datum"};
    }
    return {valid: true};
  }

  validateSkGod(god) {
    let split: any[] = god.split('/');

    if(!split[0] || !split[1] || split.length > 2 || split[0].toString().length != 4 || split[1].toString().length != 4 || 
      ( parseInt(split[1]) - parseInt(split[0]) != 1)) {
        return {valid: false, msg: "Nevalidna školska godina"};
    }
    return {valid: true};
  }

  validForm(row: StudentRow) {
    if (!row.tip)
      return {valid: false, status: "Tip članstva nije čekiran"}
    if (!row.tipInv)
      return {valid: false, status: "Tip invaliditeta nije čekiran"}
    if (!row.ime)
      return {valid: false, status: "Polje ime ne sme biti prazno"}
    if (!row.prz)
      return {valid: false, status: "Polje prezime ne sme biti prazno"}
    if (!row.dat)
      return {valid: false, status: "Polje datum ne sme biti prazno"}
    if (!row.mestoRodj)
      return {valid: false, status: "Polje mesto rodjenja ne sme biti prazno"}
    if (!row.mestoStan)
      return {valid: false, status: "Polje mesto stanovanja ne sme biti prazno"}
    if (!row.ulica)
      return {valid: false, status: "Polje ulica i broj ne sme biti prazno"}
    if (!row.fakultet)
      return {valid: false, status: "Polje fakultet ne sme biti prazno"}
    if (!row.smer)
      return {valid: false, status: "Polje smer ne sme biti prazno"}
    if (!row.godUpis)
      return {valid: false, status: "Polje datum ne sme biti prazno"}
    if (!row.godStud)
      return {valid: false, status: "Polje godina studija ne sme biti prazno"}
    if (!row.jmbg)
      return {valid: false, status: "Polje jmbg ne sme biti prazno"}
    if (!row.brLicne)
      return {valid: false, status: "Polje broj lične karte ne sme biti prazno"}
    if (!row.datUcl)
      return {valid: false, status: "Polje datum učlanjenja ne sme biti prazno"}
    if (!row.godUcl)
      return {valid: false, status: "Polje godina učlanjenja ne sme biti prazno"}
    if (!row.mob)
      return {valid: false, status: "Polje mobilni telefon ne sme biti prazno"}
    if (row.godStud && isNaN(row.godStud)) {
      return {valid: false, status: "Godina studija mora biti broj"}
    }
   
    return {valid: true};
  }
}
