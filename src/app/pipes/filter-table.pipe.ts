import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../service/data.service';
import { StudentRow } from '../view-models/student-row';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(students: StudentRow[], ime: string, prz: string, fakultet: string, smer: string, godUpisa: string, 
    godStud: number, godUcl: string, dijagnoza: string, dodatnaPodrska: string, jezici: string, racVest: string,
    studOrgs: string, mestoRodj: string, mestoStan: string, ulica: string, prisSkup: string, drugeVes: string, ispit: string,
    radVesDa: boolean, radVesNe: boolean, aktivanDa: boolean, aktivanNe: boolean, pprojDa: boolean, pprojNe: boolean,
    suspDa: boolean, suspNe: boolean, clnDa: boolean, clnNe: boolean,
    volonter: boolean, sInv: boolean, tOst: boolean, hrB: boolean, drugo: boolean): StudentRow[] {
    if (!students) {
      return [];
    } 
    
    let ret = students;
    if (ime) ret = this.basicFilter(ret, 'ime', ime);
    if (prz) ret =  this.basicFilter(ret, 'prz', prz);
    if (fakultet) ret =  this.basicFilter(ret, 'fakultet', fakultet);;
    if (smer) ret =  this.basicFilter(ret, 'smer', smer);
    if (godUpisa) ret =  this.basicFilter(ret, 'godUpis', godUpisa);
    if (godStud) ret = ret.filter(stud => stud.godStud == godStud);

    if (godUcl) ret =  this.basicFilter(ret, 'godUcl', godUcl);
    if (dijagnoza) ret =  this.basicFilter(ret, 'dijagnoza', dijagnoza);
    if (dodatnaPodrska) ret =  this.basicFilter(ret, 'dodatnaPodrska', dodatnaPodrska);
    if (jezici) ret = this.arrFilter(ret, 'jezici', jezici);
    if (racVest) ret = this.arrFilter(ret, 'racVest', racVest);
    if (studOrgs) ret = this.arrFilter(ret, 'studOrgs', studOrgs);

    if (mestoRodj) ret =  this.basicFilter(ret, 'mestoRodj', mestoRodj);
    if (mestoStan) ret =  this.basicFilter(ret, 'mestoStan', mestoStan);
    if (ulica) ret =  this.basicFilter(ret, 'ulica', ulica);
    if (prisSkup) ret = this.arrFilter(ret, 'prisSkup', prisSkup);
    if (drugeVes) ret = this.arrFilter(ret, 'drugeVes', drugeVes);
    if (ispit) ret = this.basicFilter(ret, 'ispit', ispit);

    if ( !(radVesDa && radVesNe) ) {
      if (radVesDa) ret = ret.filter( stud => stud.radVes)
      if (radVesNe) ret = ret.filter( stud => !stud.radVes)
    }

    ret = this.checkBoxFilter(ret, 'radVes', [radVesDa, radVesNe]);
    ret = this.checkBoxFilter(ret, 'aktivan', [aktivanDa, aktivanNe]);
    ret = this.checkBoxFilter(ret, 'pisanjeProj', [pprojDa, pprojNe]);
    ret = this.checkBoxFilter(ret, 'clanarina', [clnDa, clnNe]);
    ret = this.checkBoxFilter(ret, 'susp', [suspDa, suspNe]);
    

    if (volonter) ret = ret.filter( stud => stud['tip'] === 'Volonter');
    if (sInv) ret = ret.filter( stud => stud['tip'] === 'Sa invaliditetom');

    if (tOst) ret = ret.filter( stud => stud['tipInv'] === 'Telesno oštećenje');
    if (hrB) ret = ret.filter( stud => stud['tipInv'] === 'Hronična bolest');
    if (drugo) ret = ret.filter( stud => stud['tipInv'] === 'Drugo');

    return ret;
  }

  private basicFilter(arr, key, val) {
    return arr.filter( stud => stud[key].toLowerCase().includes(val.toLowerCase()));
  }

  private arrFilter(arr, key, val) {
    let arr1 = val.replace(/\s/g, '').split(',');


    let ret = [];

    var check = (item) => {
      if(!item[key])
        return;
      let arr2 = item[key].replace(/\s/g, '').split(',');
      arr1.forEach(arr1Jez => {
        arr2.forEach(arr2Jez => {
          if (arr2Jez.toLowerCase().includes(arr1Jez.toLowerCase()))
            if (!ret.includes(item))
              ret.push(item);
        });
      });
    }

    arr.forEach(check);
    return ret;

  }

  private checkBoxFilter(arr, key, val) {
    if ( !(val[0] && val[1]) ) {
      if (val[0]) return arr.filter( stud => stud[key]);
      if (val[1]) return arr.filter( stud => !stud[key]);
    }
    return arr;
  }

}
