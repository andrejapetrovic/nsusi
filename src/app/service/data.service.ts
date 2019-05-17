import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Student } from '../../assets/models/student';
import { TestData } from '../../assets/test-data';
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  students: StudentRow[] = [];
  archive: StudentRow[] = [];
  initialized: boolean = false;

  mesta: string[] = [];
  pozBrFiksni: string[] = [];
  jezici: string[] = []; 
  pozBrMob: string[] = ["060", "061", "062", "063", "064", "065", "066", "0677", "069"];
  clanarine: Clanarina[] = [
    new Clanarina({god: "2019/2020", iznos: "1214 din"}),
    new Clanarina({god: "2020/2021", iznos: "2214 din"})
  ]
  imena: string[] = [];
  prezimena: string[] = [];
  fakulteti: string[] = [];
  smerovi: string[] = [];
  skolskeGodine: string[] = [];
  dijagnoze: string[] = [];
  dodatnePodrske: string[] = [];
  racunarskeVestine: string[] = [];
  organizacije: string[] = [];
  polaganjeIspita: string[] = [];
  ulice: string[] = [];
  drugeVestine: string[] = [];

  godClanarine: string = "2020/2021";

  constructor(private electronService: ElectronService) {
    //add students
    this.electronService.ipcRenderer.on('newStudent', (event, stud: Student) => {
      stud = this.convertDates(stud);
      console.log(stud);
      this.students.push(new StudentRow(stud));
      this.setFilters();
    });

    this.electronService.ipcRenderer.on('confirmUpdate', (event, stud: Student) => {
      this.setFilters();
    });

  }

  setFilters() {

    let models = this.students.map( student => student.getModel());

    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    function flatten(arr) {
      return ([].concat.apply([], arr)).filter(distinct);
    }

    // unique mesta
    this.mesta = models.map(stud => stud.mestoStan);
    this.mesta = this.mesta.concat(this.students.map( stud => stud.mestoRodj));
    this.mesta = this.mesta.filter(distinct);

    //jezici
    let tempJez = models.map(stud => stud.jezici);
    this.jezici = flatten(tempJez);

    //poz br fiksni
    this.pozBrFiksni = models.map(stud => stud.tel.split(' ')[0]).filter(distinct);
    
    //imena
    this.imena = models.map(stud => stud.ime).filter(distinct);
    //prezimena
    this.prezimena = models.map(stud => stud.prz).filter(distinct);
    //fakulteti
    this.fakulteti = models.map(stud => stud.studInfo.fakultet).filter(distinct);
    //smerovi
    this.smerovi = models.map(stud => stud.studInfo.smer).filter(distinct); 

    //skolske godine
    this.skolskeGodine = models.map(stud => stud.studInfo.godUpis);
    this.skolskeGodine = this.skolskeGodine.concat(models.map(stud => stud.godUcl));
    let tempGod = models.map(stud => stud.prisSkup);
    this.skolskeGodine = this.skolskeGodine.concat(flatten(tempGod)).filter(distinct);
    
    //dijagnoze
    this.dijagnoze = models.map(stud => stud.dijagnoza).filter(distinct);
    //dp
    this.dodatnePodrske = models.map(stud => stud.dodatnaPodrska).filter(distinct);
    //rv
    let tempRv = models.map(stud => stud.racVest);
    this.racunarskeVestine = flatten(tempRv);
    //orgs
    let tempOrgs = models.map(stud => stud.studOrgs);
    this.organizacije = flatten(tempOrgs);
    //ulica
    this.ulice = models.map(stud => stud.ulica);
    this.ulice = this.ulice.map( ulica => {
      let idx = ulica.lastIndexOf(" ");
      let ret = ulica.substr(0, idx);
      return ret; 
    }).filter(distinct);
    //ispiti
    this.polaganjeIspita = models.map(stud => stud.ispit).filter(distinct);
    //druge vestine
    let tempVes = models.map(stud => stud.drugeVes);
    this.drugeVestine = flatten(tempVes);
    this.initialized = true;
  }

  getStudent(id) {
    let ret = this.students.find(s => s._id === id).getModel();
    if (!ret) ret = this.archive.find(s => s._id === id).getModel();
    return ret;
  }

  getStudentRow(id) {
    let ret = this.students.find(s => s._id === id);
    if (!ret) ret = this.archive.find(s => s._id === id);
    return ret;
  }

  updateStudent(student: Student) {
    this.electronService.ipcRenderer.send('updateStudent', student);
  }

  addStudent(student: Student) {
    this.electronService.ipcRenderer.send('addStudent', student);
  }

  convertDates(stud) {
    stud.dat = new Date(stud.dat);
    
    stud.datUcl = new Date(stud.datUcl);
    stud.suspenzije.forEach( susp => {
        if(susp.datPrestanka) 
            susp.datPrestanka = new Date(susp.datPrestanka);
        susp.datSusp = new Date(susp.datSusp);    
    });
    stud.clanarine.forEach( cln => {
        if(cln.dat)
            cln.dat = new Date(cln.dat);
    });
    return stud;
  }
}
