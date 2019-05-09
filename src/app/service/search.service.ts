import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private dataService: DataService) { }

  private search(arr: any[]) {
    let retVal = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : arr.filter(arg => arg.toLowerCase().indexOf(term) > -1).slice(0, 10))
    )
    return retVal;
  }

  private multiSearch(arr: any[]) {
    let retVal = (text$: Observable<string>) =>
    text$.pipe(
      map(term => {
        let str = term.replace(/\s/g, '');
        let idx = str.lastIndexOf(',');
        if (idx != null) 
          str = str.substr(idx+1);
        else 
          str = term;
        if (str.length > 0) {
          return arr.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
        }
        return [];
      })
      )
    return retVal;
  }

  searchPozMob() { return this.search(this.dataService.pozBrMob) }
  searchMesta() { return this.search(this.dataService.mesta) }
  searchPozBr() { return this.search(this.dataService.pozBrFiksni) }
  searchJezici() { return this.search(this.dataService.jezici) }
}
