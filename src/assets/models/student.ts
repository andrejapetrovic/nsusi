import { Suspenzija } from './suspenzija';
import { StudInfo } from './stud-info';
import { Clanarina } from './clanarina';

export class Student {
    _id: string;
    ime: string;
    prz: string;
    jmbg: string;
    tip: string;
    tipInv: string;
    dat: Date;
    mob: string;
    tel: string;
    aktivan: boolean;
    pisanjeProj: boolean;
    radVes: boolean;
    drugeVes: string[];
    nedostupan: boolean;
    brLicne: string;
    ulica: string;
    dijagnoza: string;
    ispit: string;
    dodatnaPodrska: string;
    mestoRodj: string;
    mestoStan: string;
    racVest: string[];
    jezici: string[];
    studOrgs: string[];
    prisSkup: string[];
    datUcl: Date;
    godUcl: string;
    suspenzije: Suspenzija[];
    studInfo: StudInfo;
    clanarine: Clanarina[];
    arhiviran: boolean = false;
    public constructor(init?:Partial<Student>) {
        Object.assign(this, init);
    }
}