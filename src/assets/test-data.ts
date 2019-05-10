import { Student } from './models/student';
import { Clanarina } from './models/clanarina';
import { Suspenzija } from './models/suspenzija';
import { StudInfo } from './models/stud-info';
import { StudentRow } from 'src/app/view-models/student-row';


export class TestData {

getData(): StudentRow[] {
    let stud1: Student = new Student({
    _id: "1",
    ime: "Pera",
    prz: "Peric",
    mestoStan: "Novi Sad",
    mestoRodj: "Novi Sad",
    aktivan: true,
    brLicne: "0123214",
    jmbg: "12344623",
    dat: new Date(1995, 2, 15),
    dijagnoza: "test dijag",
    dodatnaPodrska: "test dod pod",
    datUcl: new Date(2019, 1, 12),
    ispit: "pismeno",
    mob: "062-65234",
    tel: "021-213021",
    nedostupan: false,
    pisanjeProj: true,
    radVes: true,
    tip: "volonter",
    tipInv: "drugo",
    ulica: "Cara Dusana 32",
    jezici: ["engleski", "srpski", "nemacki"],
    racVest: ["internet", "word"],
    studOrgs: ["Test org1"],
    prisSkup: [2018, 2019, 2020],
    clanarine: [
      new Clanarina({iznos:"1000 din", placena:true, god:2019, dat: new Date(2019, 1, 26)}),
      new Clanarina({iznos:"1000 din", placena:false, god:2020})
    ],
    suspenzije: [
      new Suspenzija({datSusp: new Date(2019, 2, 19), razlog: "zato", datPrestanka: new Date(2019, 3, 1)}),
      new Suspenzija({datSusp: new Date(2019, 3, 2), razlog: "nema razloga"})
    ],
    studInfo: new StudInfo({fakultet:"FTN", godStud:4, godUpis: "2014/2015", smer:"E2"}),
    arhiviran: false,
    drugeVes: []
  })

  let stud2 = new Student({
    _id: "2",
    ime: "Sima",
    prz: "Simic",
    mestoStan: "Novi Sad",
    mestoRodj: "Beograd",
    aktivan: true,
    brLicne: "0123214",
    jmbg: "12344623",
    dat: new Date(1995, 2, 15),
    dijagnoza: "test dijag",
    dodatnaPodrska: "test dod pod",
    datUcl: new Date(2019, 1, 12),
    ispit: "pismeno",
    mob: "062-65234",
    tel: "021-213021",
    nedostupan: false,
    pisanjeProj: true,
    radVes: true,
    tip: "volonter",
    tipInv: "drugo",
    ulica: "Cara Dusana 32",
    jezici: ["engleski", "spanski"],
    racVest: ["excel", "word", "java"],
    studOrgs: ["Test org1"],
    prisSkup: [2018, 2019, 2020],
    clanarine: [
      new Clanarina({iznos:"1000 din", placena:true, god:2019, dat: new Date(2019, 1, 26)}),
      new Clanarina({iznos:"1000 din", placena:false, god:2020})
    ],
    suspenzije: [
      new Suspenzija({datSusp: new Date(2019, 2, 19), razlog: "zato", datPrestanka: new Date(2019, 3, 1)}),
      new Suspenzija({datSusp: new Date(2019, 3, 2), razlog: "nema razloga", datPrestanka: new Date(2019, 3, 15)})
    ],
    studInfo: new StudInfo({fakultet:"Fakultet tehnickih nauka", godStud:2, godUpis: "2017/2018", smer:"RA"}),
    arhiviran: false,
    drugeVes:[]
  })
   
  return [new StudentRow(stud1), new StudentRow(stud2), new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2),new StudentRow(stud2)];   
}

}