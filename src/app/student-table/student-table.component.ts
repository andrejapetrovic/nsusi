import { Component, OnInit, ViewChild, ViewChildren, QueryList, Directive, Input, Output, EventEmitter, Host } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgbTabset, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { NgForm } from '@angular/forms';
import { TabsComponent } from '../tabs/tabs.component';
import { ITab } from '../view-models/ITab';
import { SearchService } from '../service/search.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc', '': 'asc' };
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

  clanarina: string = this.dataService.godClanarine;

  constructor(public dataService: DataService, private modalService: NgbModal, @Host() private parent: TabsComponent,
    public searchService: SearchService) {
  }

  ngOnInit() {
    this.prikazClnZaGod(this.clanarina);
  }

  prikazClnZaGod(god: string) {
    this.dataService.godClanarine = god;
    this.dataService.students.forEach( row => {
      row.setClanarineZaGod(god);
    })
  }

  editStudentRow(idx: number){
    let row = this.dataService.students[idx];
    row.editable = false;
    this.dataService.updateStudent(row.updateModel());
  }

  platiCln(form: NgForm) {
    let dat = form.value.datPlacanja.split('. ');
    let c: Clanarina = new Clanarina({
      god: "2020/2021",
      dat: new Date(dat[2], dat[1], dat[0])
    }) 
    let row = this.clnStud.platiClanarinu(c);
    this.dataService.updateStudent(row.getModel());
    form.resetForm();
    this.modalService.dismissAll();
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting 
      this.dataService.students = [...this.dataService.students].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
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

  saveSusp(form: NgForm) {
    this.suspStud.dodajSuspenziju(form.value);
    form.resetForm();
    this.modalService.dismissAll();
  }

  archive(stRow: StudentRow) {
    this.dataService.students = this.dataService.students
      .filter( s => s._id !== stRow._id);
    this.dataService.archive.push(stRow);
    console.log(this.dataService.students);
    stRow.arhiviraj();
    this.dataService.updateStudent(stRow.getModel());
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
ime; prz; fakultet; smer; godUpis; godStud;
godUcl; dijagnoza; dodatnaPodrska; jezici; racVest; studOrgs;
mestoRodj; mestoStan; prisSkup; drugeVes;  ispit; ulica;
radVesDa; radVesNe; aktivanDa; aktivanNe;
pprojDa; pprojNe; suspDa; suspNe;
clnDa; clnNe;
}
