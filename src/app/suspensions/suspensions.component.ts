import { Component, OnInit, Input } from '@angular/core';
import { StudentRow } from '../view-models/student-row';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Suspenzija } from 'src/assets/models/suspenzija';

@Component({
  selector: 'app-suspensions',
  templateUrl: './suspensions.component.html',
  styleUrls: ['./suspensions.component.css']
})
export class SuspensionsComponent implements OnInit {
  
  @Input() studId: string;
  studentRow: StudentRow;

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.studentRow = this.dataService.getStudentRow(this.studId);
  }

  ukiniSusp(modalForm: NgForm) {
    let dat = modalForm.value.datPrestanka.split('. ');
    this.susp.datPrestanka = new Date(dat[2], dat[1], dat[0]);
    this.susp.godPrestanka = modalForm.value.godPrestanka;
    this.studentRow.ukiniSuspenziju(this.susp);
    modalForm.resetForm();
    this.modalService.dismissAll();
    this.dataService.updateStudent(this.studentRow.getModel());
  }

  susp: Suspenzija;

  openModal(content, susp: Suspenzija) {
    this.susp = susp;
    this.modalService.open(content, { centered: true });
  }
  
  openSuspModal(content) {
    this.modalService.open(content, { centered: true });
  }

  saveSusp(form: NgForm) {
    let row = this.studentRow.dodajSuspenziju(form.value);
    this.dataService.updateStudent(row.getModel());
    form.resetForm();
    this.modalService.dismissAll();
  }

}
