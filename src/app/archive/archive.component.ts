import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { StudentRow } from '../view-models/student-row';
import { DataService } from '../service/data.service';
import { NgbdSortableHeader, SortEvent } from '../student-table/student-table.component';
import { SearchService } from '../service/search.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(public dataService: DataService, public searchService: SearchService) { }

  ngOnInit() {
  }

  vrati(stRow: StudentRow){
      this.dataService.archive = this.dataService.archive
    .filter( s => s._id !== stRow._id);
      this.dataService.students.push(stRow);
  
    stRow.vratiIzArhive();
    this.dataService.updateStudent(stRow.getModel());
  }
  
  
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  
  onSort({column, direction}: SortEvent) {
    const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (column === 'datUcl' || column === 'dat') {
      this.dataService.archive = [...this.dataService.archive].sort((a, b) => {
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
      this.dataService.archive = [...this.dataService.archive].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
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
  stari: boolean = false;
  nedostupan: boolean = false;
  arhFiltersCollapsed: boolean;

  reset() {
    this.ime = "";
    this.prz = "";
    this.fakultet = "";
    this.smer = "";
    this.godStud = "";
    this.godUpis = "";
    this.stari = false;
    this.nedostupan = false;
  }

}
