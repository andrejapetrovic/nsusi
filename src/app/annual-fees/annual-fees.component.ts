import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';
import { Clanarina } from 'src/assets/models/clanarina';

@Component({
  selector: 'app-annual-fees',
  templateUrl: './annual-fees.component.html',
  styleUrls: ['./annual-fees.component.css']
})
export class AnnualFeesComponent implements OnInit {

  clanarine = this.dataService.clanarine;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  
  dodajCln(f: NgForm) {
    let clanarina = new Clanarina(f.value);
    this.dataService.clanarine.push(clanarina);
    this.dataService.students.forEach( row => {
      row.dodajClanarinu(f.value);
    })
    f.resetForm();
  }

}
