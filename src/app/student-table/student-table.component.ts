import { Component, OnInit, ViewChild, ViewChildren, QueryList, Directive, Input, Output, EventEmitter, Host, NgZone } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgbTabset, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { NgForm } from '@angular/forms';
import { TabsComponent } from '../tabs/tabs.component';
import { ITab } from '../view-models/ITab';
import { SearchService } from '../service/search.service';
import { ValidationService } from '../service/validation.service';
import { ElectronService } from 'ngx-electron';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  @ViewChild('tabs')
  private tabset: NgbTabset;

  clanarina: string;
  err;

  constructor(public dataService: DataService, private modalService: NgbModal, @Host() private parent: TabsComponent,
    public searchService: SearchService, private validation: ValidationService, private electronService: ElectronService,
    private zone: NgZone) {
  }

  ngOnInit() {
    this.prikazClnZaGod(this.dataService.godClanarine);
  }

  prikazClnZaGod(god: string) {

    this.dataService.godClanarine = god;
    this.clanarina = god;
    this.dataService.students.forEach( row => {
      row.setClanarineZaGod(god);
    })
    this.electronService.ipcRenderer.send('saveGod', god);
  }

  editStudentRow(idx: number){
    let row = this.dataService.students[idx];
    row.editable = false;
    this.dataService.updateStudent(row.updateModel());
  }

  close() {
    this.err = "";
  }

  platiCln(form: NgForm) {

    let dateValidator = this.validation.validateDate(form.value.datPlacanja);

    if(!dateValidator.valid) {
      this.err = dateValidator.msg;
      return;
    }

    let dat = form.value.datPlacanja.split('. ');
    let c: Clanarina = new Clanarina({
      god: this.dataService.godClanarine,
      dat: new Date(parseInt(dat[2]), parseInt(dat[1])-1, parseInt(dat[0]))
    }) 
    let row = this.clnStud.platiClanarinu(c);
    this.dataService.updateStudent(row.getModel());
    form.resetForm();
    this.modalService.dismissAll();
    this.err = "";
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (column === 'datUcl' || column === 'dat') {
      this.dataService.students = [...this.dataService.students].sort((a, b) => {
        let splitA = a[column].split('. ');
        let splitB = b[column].split('. ');
        let x = new Date(parseInt(splitA[2]), parseInt(splitA[1])-1, parseInt(splitA[0]));
        let y = new Date(parseInt(splitB[2]), parseInt(splitB[1])-1, parseInt(splitB[0]));
        const res = compare(x, y);
        return direction === 'asc' ? res : -res;
      });
    }
    else {
    // sorting 
      this.dataService.students = [...this.dataService.students].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  public suspStud: StudentRow ;
  
  openSuspModal(content, studRow: StudentRow) {
    this.suspStud = studRow;
    this.modalService.open(content, { centered: true });
  }

  private clnStud: StudentRow ;
  
  openClnModal(content, studRow: StudentRow) {
    this.clnStud = studRow;
    this.modalService.open(content, { centered: true });
  }

  private arhStud: StudentRow ;
  
  openArhModal(content, studRow: StudentRow) {
    this.arhStud = studRow;
    this.modalService.open(content, { centered: true });
  }

  saveSusp(form: NgForm) {

    let dateValidator = this.validation.validateDate(form.value.datSusp);

    if(!dateValidator.valid) {
      this.err = dateValidator.msg;
      return;
    }

    let godValidator = this.validation.validateSkGod(form.value.godSusp);

    if(!godValidator.valid) {
      this.err = godValidator.msg;
      return;
    }

    this.suspStud.dodajSuspenziju(form.value);
    form.resetForm();
    this.dataService.updateStudent(this.suspStud.getModel());
    this.modalService.dismissAll();
    this.err = "";
  }

  arhiviraj(f: NgForm) {
    let row = this.dataService.students.find( stud => stud._id === this.arhStud._id);
    this.dataService.students = this.dataService.students
      .filter( s => s._id !== row._id);
    
      row.arhiviraj(f.value);
      this.dataService.updateStudent(row.getModel());
      f.resetForm;
      this.modalService.dismissAll();
      this.dataService.archive.push(row);
  }

  openEdit(stRow: StudentRow) {
    let tab: ITab = {
      type: "student",
      studId: stRow._id,
      name: "Ažuriraj (" + stRow.ime + " " + stRow.prz+ ")",
      unique: true,
      id: "student"+stRow._id    
    }
    this.parent.createUniqueTab(tab);
  }

  openFees(stRow: StudentRow) {
    let tab: ITab = {
      type: "clanarina",
      studId: stRow._id,
      name: "Članarine (" + stRow.ime + " " + stRow.prz+ ")",
      unique: true,
      id: "clanarina"+stRow._id     
    }
    this.parent.createUniqueTab(tab);
  }

  openSuspensions(stRow: StudentRow) {
    let tab: ITab = {
      type: "suspenzija",
      studId: stRow._id,
      name: "Suspenzije (" + stRow.ime + " " + stRow.prz+ ")",
      unique: true,
      id: "suspenzija"+stRow._id     
    }
    this.parent.createUniqueTab(tab);
  }

  // filteri
  ime: string; 
  prz: string; 
  fakultet: string; 
  smer: string;
  godUpis: string; 
  godStud: string;
  godUcl: string;
  dijagnoza: string; 
  dodatnaPodrska: string; 
  jezici: string; 
  racVest: string; 
  studOrgs: string;
  mestoRodj: string; 
  mestoStan: string; 
  prisSkup: string; 
  drugeVes: string;
  ispit: string;
  ulica: string;
  radVesDa: boolean; 
  radVesNe: boolean;
  aktivanDa: boolean;
  aktivanNe: boolean;
  pprojDa: boolean;
  pprojNe: boolean;
  suspDa: boolean;
  suspNe: boolean;
  clnDa: boolean;
  clnNe: boolean;
  volonter: boolean;
  sInv: boolean;
  tOst: boolean;
  hrB: boolean;
  drugo: boolean;
  filtersCollapsed: boolean;

  reset() {
    this.ime = ""; 
    this.prz = ""; 
    this.fakultet = ""; 
    this.smer = "";
    this.godUpis = ""; 
    this.godStud = "";
    this.godUcl = "";
    this.dijagnoza = ""; 
    this.dodatnaPodrska = ""; 
    this.jezici = ""; 
    this.racVest = ""; 
    this.studOrgs = "";
    this.mestoRodj = ""; 
    this.mestoStan = ""; 
    this.prisSkup = ""; 
    this.drugeVes = "";
    this.ispit = "";
    this.ulica = "";
    this.radVesDa = false; 
    this.radVesNe = false;
    this.aktivanDa = false;
    this.aktivanNe = false;
    this.pprojDa = false;
    this.pprojNe = false;
    this.suspDa = false;
    this.suspNe = false;
    this.clnDa = false;
    this.clnNe = false;
    this.volonter = false;
    this.sInv = false;
    this.tOst = false;
    this.hrB = false;
    this.drugo = false;
  }

  refresh() {
    this.reset();
    this.dataService.clanarine = [];
    this.dataService.students = [];
    this.dataService.archive = [];
    this.electronService.ipcRenderer.send('getFees');
  }
}
