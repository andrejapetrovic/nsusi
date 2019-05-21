import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public dataService: DataService) { }

  private rvArr = ["word", "excel", "uopste", "internet"];
   
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
      map(term => {
        if (term.length < 1) return [];
        else {
            let str = term.replace(/\s/g, '');
            let idx = str.lastIndexOf(',');
            let prefix = "";
            if (idx != null) {
              prefix = str.substr(0, idx+1);
              str = str.substr(idx+1);
            }
            else 
              str = term;
            if (str.length > 0) {
              let filtered = this.dataService.jezici.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
              if(prefix) {
                let rpl = prefix.replace(/\s/g, '');
                let arr = prefix.split(',');
                filtered = filtered.filter(x => !arr.includes(x));
              }
              return filtered.map( jez => jez = prefix + jez);
            }
            return [];
        } 
      })
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

    searchSkGodMulti = (text$: Observable<string>) =>
    text$.pipe(
      map(term => {
        if (term.length < 1) return [];
        else {
            let str = term.replace(/\s/g, '');
            let idx = str.lastIndexOf(',');
            let prefix = "";
            if (idx != null) {
              prefix = str.substr(0, idx+1);
              str = str.substr(idx+1);
            }
            else 
              str = term;
            if (str.length > 0) {
              let filtered = this.dataService.skolskeGodine.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
              if(prefix) {
                let rpl = prefix.replace(/\s/g, '');
                let arr = prefix.split(',');
                filtered = filtered.filter(x => !arr.includes(x));
              }
              return filtered.map( jez => jez = prefix + jez);
            }
            return [];
        } 
      })
    )
  
  searchOrgs = (text$: Observable<string>) =>
  text$.pipe(
    map(term => {
      if (term.length < 1) return [];
      else {
          let str = term.replace(/\s/g, '');
          let idx = str.lastIndexOf(',');
          let prefix = "";
          if (idx != null) {
            prefix = str.substr(0, idx+1);
            str = str.substr(idx+1);
          }
          else 
            str = term;
          if (str.length > 0) {
            let filtered = this.dataService.organizacije.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
            if(prefix) {
              let rpl = prefix.replace(/\s/g, '');
              let arr = prefix.split(',');
              filtered = filtered.filter(x => !arr.includes(x));
            }
            return filtered.map( jez => jez = prefix + jez);
          }
          return [];
      } 
    })
  )

  searchIspiti = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? [] 
        : this.dataService.polaganjeIspita.filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  searchRv = (text$: Observable<string>) =>
  text$.pipe(
    map(term => {
      if (term.length < 1) return [];
      else {
          let str = term.replace(/\s/g, '');
          let idx = str.lastIndexOf(',');
          let prefix = "";
          if (idx != null) {
            prefix = str.substr(0, idx+1);
            str = str.substr(idx+1);
          }
          else 
            str = term;
          if (str.length > 0) {
           
            let filtered = this.dataService.racunarskeVestine.filter(x => !this.rvArr.includes(x));
            filtered = filtered.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
            if(prefix) {
              let rpl = prefix.replace(/\s/g, '');
              let arr = prefix.split(',');
              filtered = filtered.filter(x => !arr.includes(x));
            }
            return filtered.map( jez => jez = prefix + jez);
          }
          return [];
      } 
    })
  )

  searchDv = (text$: Observable<string>) =>
  text$.pipe(
    map(term => {
      if (term.length < 1) return [];
      else {
          let str = term.replace(/\s/g, '');
          let idx = str.lastIndexOf(',');
          let prefix = "";
          if (idx != null) {
            prefix = str.substr(0, idx+1);
            str = str.substr(idx+1);
          }
          else 
            str = term;
          if (str.length > 0) {
            let filtered = this.dataService.drugeVestine.filter(arg => arg.toLowerCase().indexOf(str) > -1).slice(0, 10);
            if(prefix) {
              let rpl = prefix.replace(/\s/g, '');
              let arr = prefix.split(',');
              filtered = filtered.filter(x => !arr.includes(x));
            }
            return filtered.map( jez => jez = prefix + jez);
          }
          return [];
      } 
    })
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
  
    searchCln = (text$: Observable<string>) =>
    text$.pipe(
      map(term => {
        return this.dataService.clanarine.map(c => c.god).filter(arg => arg.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      })
    )
  
}
