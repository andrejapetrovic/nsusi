import { Component, OnInit } from '@angular/core';
import { StudentRow } from '../view-models/student-row';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  vrati(stRow: StudentRow){
      this.dataService.archive = this.dataService.archive
    .filter( s => s._id !== stRow._id);
      this.dataService.students.push(stRow);
  
    stRow.vratiIzArhive()
  }
}
