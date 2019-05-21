import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../service/data.service';
import { Student } from '../../assets/models/student'
import { StudentRow } from '../view-models/student-row';
import { Clanarina } from 'src/assets/models/clanarina';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../service/validation.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  @Input() studId: string;
  studentRow: StudentRow;
  err;
  constructor(private dataService: DataService, private modalService: NgbModal, private validation: ValidationService) { }

  ngOnInit() {
    this.studentRow = this.dataService.getStudentRow(this.studId);
  }

  platiCln(modalForm: NgForm) {

    let dateValidator = this.validation.validateDate(modalForm.value.dat);

    if(!dateValidator.valid) {
      this.err = dateValidator.msg;
      return;
    }

    let dat = modalForm.value.dat.split('. ');
    this.cln.dat = new Date(dat[2], dat[1]-1, dat[0]);
    this.studentRow.platiClanarinu(this.cln);
    modalForm.resetForm();
    this.modalService.dismissAll();
    this.dataService.updateStudent(this.studentRow.getModel());
    this.err = "";
  }

  obrisiCln(cln: Clanarina) {
    this.studentRow.obrisiClanarinu(cln);
    this.dataService.updateStudent(this.studentRow.getModel());
  }

  cln: Clanarina;

  openModal(content, cln: Clanarina) {
    this.cln = cln;
    this.modalService.open(content, { centered: true });
  }

  close() {
    this.err = "";
  }

  
}
