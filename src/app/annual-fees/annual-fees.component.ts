import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';
import { Clanarina } from 'src/assets/models/clanarina';
import { ElectronService } from 'ngx-electron';
import { ValidationService } from '../service/validation.service';

@Component({
  selector: 'app-annual-fees',
  templateUrl: './annual-fees.component.html',
  styleUrls: ['./annual-fees.component.css']
})
export class AnnualFeesComponent implements OnInit {

  err;
  disabledInput: boolean = false;

  constructor(public dataService: DataService, private electronService: ElectronService, private zone: NgZone,
    private dateValidation: ValidationService) { }

  ngOnInit() {
    this.electronService.ipcRenderer.on('newFee', (error, fee) => {
      this.zone.run( () => {
        this.dataService.clanarine.push(fee);
        this.disabledInput = false;
        this.err = "";
      })
      this.electronService.ipcRenderer.send('addFeesToAll', fee);
      this.dataService.students.forEach( row => {
        row.dodajClanarinu(fee);
      })
    });
    this.electronService.ipcRenderer.on('feesAdded', (error, arg) => {
      console.log(arg);
    })
  }

  
  dodajCln(f: NgForm) {
    if(f.value.god === "" || f.value.iznos === "" ) {
      this.err = "Nisu uneti podaci u sva polja";
      return;
    }
    let validate = this.dateValidation.validateSkGod(f.value.god);
    if(!validate.valid) {
      this.err = validate.msg;
      return;
    }
    
    let godine = this.dataService.clanarine.map(c => c.god).filter(g => g === f.value.god);
    if(godine.length > 0) {
      this.err = "Već postoji uneta školska godina";
      return;
    }
    let clanarina = new Clanarina(f.value);
    this.electronService.ipcRenderer.send('addFee', clanarina);
    this.disabledInput = true;
    f.resetForm();
  }

  close() {
    this.err = "";
  }

}
