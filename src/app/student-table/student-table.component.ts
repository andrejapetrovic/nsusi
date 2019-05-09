import { Component, OnInit, ViewChild, ViewChildren, QueryList, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../assets/models/student';
import { DataService } from '../service/data.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { NgForm } from '@angular/forms';

export interface ITab {
  id: string;
  name: string;
  unique: boolean;
  studId?: string;
}

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

  private closableTabs: ITab[] = [];
  private students: StudentRow[] = this.dataService.students;

  @ViewChild('tabs')
  private tabset: NgbTabset;

  constructor(private dataService: DataService) {
    console.log(dataService.students);
  }

  ngOnInit() {

  }
  
  closeTab(tab: ITab, $event) {
    $event.preventDefault();
    this.closableTabs = this.closableTabs.filter(t => t.id !== tab.id);
  }
  
  createUniqueTab(id, name) {
    if (this.closableTabs.filter(tab => tab.id === id).length == 0) {
      this.closableTabs.push({id: id, name: name, unique: true});
      this.tabset.activeId = "ngb-tab-" + (this.closableTabs.length + 1);
    }
  }

  editStudentRow(idx: number){
    let row = this.students[idx];
    row.editable = false;
    console.log(row.updateModel());
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
    console.log(studRow);
    studRow.dodajClanarinu(f.value);
    f.resetForm();
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
      this.students = [...this.students].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
  }



}
