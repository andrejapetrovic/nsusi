import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { interval} from 'rxjs';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {   
    let timer = interval(500)
      .subscribe((val) => { 
         if (this.dataService.initialized) {
           this.router.navigate(['/students']);
           timer.remove
         }
      });
  }

  public test() {
    console.log(this.dataService.initialized);
  }
}
