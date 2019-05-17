import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private dataService: DataService) { }

  /*private multiSearch(arr: any[]) {
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
  }*/

   
  searchPozMob = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.pozBrMob.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    searchMesta = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.mesta.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
   

  
    searchPozBr = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.pozBrFiksni.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

   
    searchJezici = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.jezici.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  
  searchImena = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.imena.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchPrezimena = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.prezimena.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  searchFakulteti = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.fakulteti.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchSmerovi = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.smerovi.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchSkGod = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.skolskeGodine.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  searchOrgs = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.organizacije.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchIspiti = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.polaganjeIspita.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  searchRv = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.racunarskeVestine.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchDv = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.drugeVestine.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchDijagnoze = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.dijagnoze.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchDp = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.dodatnePodrske.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchUlice = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.ulice.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  
}
