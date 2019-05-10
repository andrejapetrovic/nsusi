import { Component, OnInit, ViewChild, ViewChildren, QueryList, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../assets/models/student';
import { DataService } from '../service/data.service';
import { NgbTabset, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { NgForm } from '@angular/forms';
import { Suspenzija } from 'src/assets/models/suspenzija';

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

  constructor(private dataService: DataService, private modalService: NgbModal) {

  }

  ngOnInit() {
  }

  editStudentRow(idx: number){
    let row = this.dataService.students[idx];
    row.editable = false;
  }

  platiCln(studRow: StudentRow, $event) {
    $event.stopPropagation();
    studRow.platiClanarinu();
  }

  obrisiCln(studRow: StudentRow, cln: Clanarina, $event) {
    $event.stopPropagation();
    studRow.obrisiClanarinu(cln);
  }

  dodajCln(studRow: StudentRow, f: NgForm) {
    studRow.dodajClanarinu(f.value);
    f.resetForm();
  }

  private ukiniSusp(studRow: StudentRow, $event) {
    $event.stopPropagation();
    studRow.ukiniSuspenziju();
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

  private suspStud: StudentRow ;
  
  openSuspModal(content, studRow: StudentRow, $event) {
    $event.stopPropagation();
    this.suspStud = studRow;
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
    this.dataService.students = this.dataService.students
      .filter( s => s._id !== stRow._id);
    this.dataService.archive.push(stRow);
    console.log(this.dataService.students);
    stRow.arhiviraj();
  }


}
