import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../service/data.service';
import { StudentRow } from '../view-models/student-row';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(students: StudentRow[], ime: string, prz: string, fakultet: string, smer: string, godUpisa: string, 
    godStud: number): StudentRow[] {
    if (!students) {
      return [];
    } 
    
    let ret = students;
    if (ime) ret = ret.filter(stud => stud.ime.toLowerCase().includes(ime.toLowerCase()));
    if (prz) ret = ret.filter(stud => stud.prz.toLowerCase().includes(prz.toLowerCase()));
    if (fakultet) ret = ret.filter(stud => stud.fakultet.toLowerCase().includes(fakultet.toLowerCase()));
    if (smer) ret = ret.filter(stud => stud.smer.toLowerCase().includes(smer.toLowerCase()));
    if (godUpisa) ret = ret.filter(stud => stud.godUpis.includes(godUpisa));
    if (godStud) ret = ret.filter(stud => stud.godStud == godStud);
    return ret;
  }

}
